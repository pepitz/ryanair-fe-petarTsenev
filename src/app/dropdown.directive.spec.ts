import { ClickOutsideDirective } from './dropdown.directive';

describe('DropdownDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(this);
    expect(directive).toBeTruthy();
  });
});
