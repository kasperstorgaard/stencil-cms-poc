import { flush, render } from '@stencil/core/testing';
import { MyName, MyNameElement } from './my-name';

/**
 * Sets up the test by rendering the passed html as a MyName component.
 * @param html The html of the component. must contain <my-name></my-name>.
 * @returns The html element.
 */
function setup(html): Promise<MyNameElement> {
  return render({
    components: [MyName],
    html
  });
}

describe('<my-name> component', () => {
  it('should be defined', () => {
    expect(new MyName()).toBeTruthy();
  });

  it('should render', async () => {
    const element = await setup('<my-name></my-name>');

    expect(element.textContent).toEqual('Hello, my name is  ');
  });

  it('should use "first" property', async () => {
    const element = await setup('<my-name first="Peter"></my-name>');

    expect(element.textContent).toEqual('Hello, my name is Peter ');
  });

  it('should use "last" property', async () => {
    const element = await setup('<my-name last="Parker"></my-name>');

    expect(element.textContent).toEqual('Hello, my name is  Parker');
  });

  it('should use both "first" and "last" properties', async () => {
    const element = await setup('<my-name first="Peter" last="Parker"></my-name>');

    expect(element.textContent).toEqual('Hello, my name is Peter Parker');
  });

  it('should set "first" and "last" from code', async () => {
    const element = await setup('<my-name></my-name>');

    element.first = "Peter";
    element.last = "Parker";
    await flush(element);

    expect(element.textContent).toEqual('Hello, my name is Peter Parker');
  });
});