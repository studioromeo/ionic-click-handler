import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      // fotRoot is required to bootstrap the web components in the test
      imports: [IonicModule.forRoot()]
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // NOTE: this does not seem to affect the tests
    await fixture.whenStable();
  });

  fit('should listen to click events', done => {
    // When dispatching click events on ionic components their inner component
    // event handlers do not normally fire even after whenStable has resolved.
    //
    // Adding a small delay via setTimeout seems to resolve this as the event handlers
    // fire. This is most apparent with the segment where without setTimeout will
    // not update its value.
    //
    // Also this test will only pass if chrome is in focus. If the test is run with chrome in
    // the background this test will never pass.
    //
    // I'm not sure why this is as the custom element appears to be registered so the handlers
    // should be listening
    console.log(customElements.get('ion-segment'));
    setTimeout(() => {
      const segment2 = fixture.nativeElement.querySelector('.seg-2');
      segment2.click();
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('.i-button');
      button.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.segment).toBe('seg-2');
      done();
    }, 1000);
  });
});
