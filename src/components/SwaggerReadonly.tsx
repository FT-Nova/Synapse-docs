import React, {useEffect, useRef} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {specPath: string};

declare global {
  interface Window {
    SwaggerUIBundle?: any;
    SwaggerUIStandalonePreset?: any;
  }
}

function SwaggerRuntime({specPath}: Props): React.JSX.Element {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const specUrl = useBaseUrl(specPath);

  useEffect(() => {
    if (!window.SwaggerUIBundle || !mountRef.current) {
      return;
    }

    window.SwaggerUIBundle({
      url: specUrl,
      domNode: mountRef.current,
      deepLinking: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
      supportedSubmitMethods: [],
      presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
    });
  }, [specUrl]);

  return <div className="swagger-readonly" ref={mountRef} />;
}

export default function SwaggerReadonly(props: Props): React.JSX.Element {
  return (
    <BrowserOnly fallback={<p>Loading API reference…</p>}>
      {() => <SwaggerRuntime {...props} />}
    </BrowserOnly>
  );
}
