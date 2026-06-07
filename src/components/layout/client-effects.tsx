"use client";

import dynamic from "next/dynamic";

const CursorEffects = dynamic(
  () => import("@/components/shared/cursor-effects").then((m) => m.CursorEffects),
  { ssr: false }
);

const MouseSpotlight = dynamic(
  () => import("@/components/shared/mouse-spotlight").then((m) => m.MouseSpotlight),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <CursorEffects />
      <MouseSpotlight />
    </>
  );
}
