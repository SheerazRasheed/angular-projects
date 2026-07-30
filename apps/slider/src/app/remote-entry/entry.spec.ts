import { TestBed } from '@angular/core/testing';
import { RemoteEntry } from './entry';

describe('RemoteEntry', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteEntry],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RemoteEntry);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the first project title', () => {
    const fixture = TestBed.createComponent(RemoteEntry);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.slide__title')?.textContent).toContain(
      'Realtime Order Dashboard',
    );
  });
});
