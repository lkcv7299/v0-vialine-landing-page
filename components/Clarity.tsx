"use client"

import Script from "next/script"

export default function Clarity() {
  const PROJECT_ID = "tqsb44c0x2" // Reemplaza con tu Clarity Project ID

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${PROJECT_ID}");
      `}
    </Script>
  )
}
