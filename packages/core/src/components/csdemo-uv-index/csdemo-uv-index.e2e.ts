import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('csdemo-uv-index', () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<csdemo-uv-index></csdemo-uv-index>');
    element = await page.find('csdemo-uv-index');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('renders without parameters', () => {
    expect(element.textContent.trim()).toEqual('');
  });

  it('displays the UV Index with a single sigfig', async () => {
    element.setProperty('uvIndex', 4.235);
    await page.waitForChanges();
    const value = await page.find('csdemo-uv-index >>> .value');
    expect(value.textContent.trim()).toEqual('4.2');
  });

  it('displays UV Index of zero properly', async () => {
    element.setProperty('uvIndex', 0);
    await page.waitForChanges();
    const value = await page.find('csdemo-uv-index >>> .value');
    expect(value.textContent.trim()).toEqual('0.0');
  });

  describe('description', () => {
    it('is low for zero', async () => {
      element.setProperty('uvIndex', 0);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Low');
    });

    it('is low for 2.9', async () => {
      element.setProperty('uvIndex', 2.9);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Low');
    });

    it('is moderate for 3', async () => {
      element.setProperty('uvIndex', 3);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Moderate');
    });

    it('is moderate for 5.9', async () => {
      element.setProperty('uvIndex', 5.9);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Moderate');
    });

    it('is high for 6', async () => {
      element.setProperty('uvIndex', 6);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('High');
    });

    it('is high for 7.9', async () => {
      element.setProperty('uvIndex', 7.9);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('High');
    });

    it('is very high for 8', async () => {
      element.setProperty('uvIndex', 8);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Very High');
    });

    it('is very high for 10.9', async () => {
      element.setProperty('uvIndex', 10.9);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Very High');
    });

    it('is extreme for 11', async () => {
      element.setProperty('uvIndex', 11);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Extreme');
    });

    it('is extreme for 15', async () => {
      element.setProperty('uvIndex', 15);
      await page.waitForChanges();
      const description = await page.find('csdemo-uv-index >>> .description');
      expect(description.textContent.trim()).toEqual('Extreme');
    });
  });

  describe('class', () => {
    it('is low-risk for 0', async () => {
      element.setProperty('uvIndex', 0);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('low-risk');
    });

    it('is low-risk for 2.9', async () => {
      element.setProperty('uvIndex', 2.9);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('low-risk');
    });

    it('is moderate-risk for 3', async () => {
      element.setProperty('uvIndex', 3);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('moderate-risk');
    });

    it('is moderate-risk for 5.9', async () => {
      element.setProperty('uvIndex', 5.9);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('moderate-risk');
    });

    it('is high-risk for 6', async () => {
      element.setProperty('uvIndex', 6);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('high-risk');
    });

    it('is high-risk for 7.9', async () => {
      element.setProperty('uvIndex', 7.9);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('high-risk');
    });

    it('is very-high-risk for 8', async () => {
      element.setProperty('uvIndex', 8);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('very-high-risk');
    });

    it('is very-high-risk for 10.9', async () => {
      element.setProperty('uvIndex', 10.9);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('very-high-risk');
    });

    it('is extreme-risk for 11', async () => {
      element.setProperty('uvIndex', 11);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('extreme-risk');
    });

    it('is extreme-risk for 17', async () => {
      element.setProperty('uvIndex', 17);
      await page.waitForChanges();
      const mainDiv = await page.find('csdemo-uv-index >>> div');
      expect(mainDiv).toHaveClass('extreme-risk');
    });
  });
});
