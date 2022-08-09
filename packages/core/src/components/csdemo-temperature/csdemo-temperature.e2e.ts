import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('csdemo-temperature', () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<csdemo-temperature></csdemo-temperature>');
    element = await page.find('csdemo-temperature');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('displays nothing without parameters', async () => {
    const labelElement = await page.find('csdemo-temperature >>> span');
    expect(labelElement).toBeFalsy();
  });

  describe('Celsius', () => {
    beforeEach(async () => {
      element.setProperty('scale', 'C');
      await page.waitForChanges();
    });

    it('displays negative temps properly', async () => {
      element.setProperty('temperature', 254.55);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent).toEqual('-19 ℃');
    });

    it('displays freezing properly', async () => {
      element.setProperty('temperature', 273.15);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('0 ℃');
    });

    it('displays normal tempurature properly', async () => {
      element.setProperty('temperature', 300.9);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('28 ℃');
    });

    it('converts boiling properly', async () => {
      element.setProperty('temperature', 373.15);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('100 ℃');
    });
  });

  describe('using a scale of F', () => {
    beforeEach(async () => {
      element.setProperty('scale', 'F');
      await page.waitForChanges();
    });

    it('converts negative temps properly', async () => {
      element.setProperty('temperature', 254.55);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('-1 ℉');
    });

    it('converts freezing properly', async () => {
      element.setProperty('temperature', 273.15);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('32 ℉');
    });

    it('converts normal tempurature properly', async () => {
      element.setProperty('temperature', 300.9);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('82 ℉');
    });

    it('converts boiling properly', async () => {
      element.setProperty('temperature', 373.15);
      await page.waitForChanges();
      const labelElement = await page.find('csdemo-temperature >>> span');
      expect(labelElement.textContent.trim()).toEqual('212 ℉');
    });
  });
});
