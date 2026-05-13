"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";

const Dithering = dynamic(
	() => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
	{ ssr: false }
);

export function PaperBackground() {
	const grainId = useId();
	const filterId = `paper-grain-${grainId.replace(/:/g, "")}`;
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	if (dimensions.width === 0) {
		return <div className="fixed inset-0 -z-10 bg-[#f7f2e4]" />;
	}

	return (
		<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f2e4]">
			<div className="absolute inset-0 opacity-40">
				<Dithering
					colorBack="#f7f2e4"
					colorFront="#1769DC"
					height={dimensions.height}
					minPixelRatio={1}
					scale={0.84}
					shape="warp"
					size={1}
					speed={0.15}
					type="4x4"
					width={dimensions.width}
				/>
			</div>

			<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply">
				<svg aria-hidden className="size-full" role="presentation">
					<filter id={filterId}>
						<feTurbulence
							baseFrequency="0.85"
							numOctaves={4}
							result="noise"
							stitchTiles="stitch"
							type="fractalNoise"
						/>
						<feColorMatrix in="noise" type="saturate" values="0" />
					</filter>
					<rect filter={`url(#${filterId})`} height="100%" width="100%" />
				</svg>
			</div>

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)]" />
		</div>
	);
}
