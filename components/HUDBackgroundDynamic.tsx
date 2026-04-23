"use client";

import dynamic from "next/dynamic";

const HUDBackground = dynamic(() => import("./HUDBackground"), { ssr: false });

export default HUDBackground;
