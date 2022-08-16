import { Config } from '@stencil/core';
import { angularOutputTarget as angular, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { vueOutputTarget as vue } from '@stencil/vue-output-target';
const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['csdemo-temperature'],
    event: 'csdemoChange',
    targetAttr: 'temperature',
    type: 'number',
  },
];
export const config: Config = {
  namespace: 'csdemoweather',
  outputTargets: [
    angular({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      directivesProxyFile: '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
      includeImportCustomElements: true,
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    react({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
    }),
    vue({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      proxiesFile: '../vue/src/components.ts',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: '**/*.{jpg,png}',
          dest: '../images',
          warn: true,
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};
