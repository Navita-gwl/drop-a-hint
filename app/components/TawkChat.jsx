import { useEffect } from "react";

const TAWK_SRC = "https://embed.tawk.to/6ad0ad3527d6fa34c3988e8c/1k4vi976k";

export function TawkChat() {
  useEffect(() => {
    if (document.getElementById("tawk-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = TAWK_SRC;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
