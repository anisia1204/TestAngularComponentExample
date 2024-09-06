import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {OverlayContainer} from "@angular/cdk/overlay";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {testData} from "./test-data";
import {AppService} from "./app.service";
import {of} from "rxjs";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let element: DebugElement;
  let overlayContainer: OverlayContainer;

  const triggerMatMenuButton = () => {
    const menuTriggerButton = element.query(By.css('.mat-mdc-menu-trigger'))
    menuTriggerButton.nativeElement.click();
    fixture.detectChanges();
  }

  const getActionOrder = () => {
    const actions = Array.from(overlayContainer.getContainerElement().querySelectorAll('button.mat-mdc-menu-item'));
    return actions.map(action => action.id)
  }

  const appServiceSpy = jasmine.createSpyObj('AppService', ['getStatuses']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          AppComponent,
          NoopAnimationsModule,
        ],
        providers: [
          {
            provide: AppService,
            useValue: appServiceSpy
          }
        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          overlayContainer = TestBed.inject(OverlayContainer);
        })
    })
  );

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it("1. if status1 is true and status2 is true then 'True' action should be enabled and it should be the first in the menu", () => {
    appServiceSpy.getStatuses.and.returnValue(of(testData[0]));
    fixture.detectChanges();
    console.log("a")
    expect(appServiceSpy.getStatuses).toHaveBeenCalled()

    triggerMatMenuButton();

    const trueAction = element.query(By.css("#true"))
    expect(trueAction.nativeElement.id).toBe("true")

    const disabledState = trueAction.nativeElement.disabled
    expect(disabledState).toBe(false);

    const actionOrder = getActionOrder()
    expect(actionOrder[0]).toBe('true')
    expect(actionOrder[1]).toBe('false')
    expect(actionOrder[2]).toBe('partial')
  })

  it("2. if status1 is true and status2 is false then 'Partial' action should be enabled and it should be the first in the menu", () => {
    appServiceSpy.getStatuses.and.returnValue(of(testData[1]))
    fixture.detectChanges();

    triggerMatMenuButton();

    const partialAction = element.query(By.css("#partial"))
    expect(partialAction.nativeElement.id).toBe("partial")

    const disabledState = partialAction.nativeElement.disabled
    expect(disabledState).toBe(false);

    const actionOrder = getActionOrder()
    expect(actionOrder[0]).toBe('partial')
    expect(actionOrder[1]).toBe('false')
    expect(actionOrder[2]).toBe('true')
  })

  it("3. if status1 is false and status2 is true then 'Partial' action should be enabled and it should be the first in the menu", () => {
    appServiceSpy.getStatuses.and.returnValue(of(testData[2]))
    fixture.detectChanges();

    triggerMatMenuButton();

    const partialAction = element.query(By.css("#partial"))
    expect(partialAction.nativeElement.id).toBe("partial")

    const disabledState = partialAction.nativeElement.disabled
    expect(disabledState).toBe(false);

    const actionOrder = getActionOrder()
    expect(actionOrder[0]).toBe('partial')
    expect(actionOrder[1]).toBe('false')
    expect(actionOrder[2]).toBe('true')
  })

  it("4. if status1 is false and status2 is false then 'False' action should be enabled and it should be the first in the menu", () => {
    appServiceSpy.getStatuses.and.returnValue(of(testData[3]))
    fixture.detectChanges();

    triggerMatMenuButton();

    const falseAction = element.query(By.css("#false"))
    expect(falseAction.nativeElement.id).toBe("false")

    const disabledState = falseAction.nativeElement.disabled
    expect(disabledState).toBe(false);

    const actionOrder = getActionOrder()
    expect(actionOrder[0]).toBe('false')
    expect(actionOrder[1]).toBe('partial')
    expect(actionOrder[2]).toBe('true')
  })
});
