import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime


BASE_URL = "https://www.mangakakalot.gg/"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_page(url: str) -> BeautifulSoup | None:
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    except requests.RequestException as e:
        print(f"[ERROR] Failed to fetch {url}: {e}")
        return None


def parse_manga_list(soup: BeautifulSoup) -> list[dict]:
    mangas = []

    # Try common selectors used by manga aggregator sites
    selectors = [
        # mangakakalot-style panels
        ("div.manga-list-4-list li", "h3 a", "img", "span.manga-list-4-item-subtitle"),
        # panel / card style
        ("div.panel_story_list .story_item", ".story_item_right h3 a", "img.img-loading", "span.text-nowrap"),
        # generic fallback
        ("div.list-truyen-item-wrap", "h3 a", "img", "span.chapter-time"),
    ]

    for container_sel, title_sel, img_sel, chapter_sel in selectors:
        items = soup.select(container_sel)
        if not items:
            continue

        for item in items:
            title_tag = item.select_one(title_sel)
            img_tag = item.select_one(img_sel)
            chapter_tag = item.select_one(chapter_sel)

            if not title_tag:
                continue

            mangas.append({
                "title": title_tag.get_text(strip=True),
                "url": title_tag.get("href", "N/A"),
                "cover": img_tag.get("src") or img_tag.get("data-src", "N/A") if img_tag else "N/A",
                "latest_chapter": chapter_tag.get_text(strip=True) if chapter_tag else "N/A",
            })

        if mangas:
            break  # stop trying selectors once we find results

    # Broad fallback: grab every anchor that looks like a manga link
    if not mangas:
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"]
            if "/manga/" in href or "/read/" in href:
                title = a_tag.get_text(strip=True)
                if title:
                    mangas.append({"title": title, "url": href, "cover": "N/A", "latest_chapter": "N/A"})

    # Deduplicate by URL
    seen = set()
    unique = []
    for m in mangas:
        key = m["url"]
        if key not in seen:
            seen.add(key)
            unique.append(m)

    return unique


def display(mangas: list[dict]) -> None:
    if not mangas:
        print("No mangas found. The site structure may have changed — inspect the HTML and update the selectors.")
        return

    print(f"\n{'='*70}")
    print(f"  Latest Mangas on MangaKakalot  [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"{'='*70}\n")

    for i, m in enumerate(mangas, 1):
        print(f"{i:>3}. {m['title']}")
        print(f"       Chapter : {m['latest_chapter']}")
        print(f"       URL     : {m['url']}")
        print()


def main():
    print(f"Fetching {BASE_URL} ...")
    soup = fetch_page(BASE_URL)
    if soup is None:
        return

    mangas = parse_manga_list(soup)
    display(mangas)

    # Optionally save to JSON
    if mangas:
        out_file = "latest_mangas.json"
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(mangas, f, ensure_ascii=False, indent=2)
        print(f"Results saved to {out_file}")


if __name__ == "__main__":
    main()