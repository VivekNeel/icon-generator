/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { toPng } from "html-to-image";
import {
	iconBgColor,
	icons,
	ribbonBgColor,
	ribbonTextColor,
} from "@/constants";

// eslint-disable-next-line react/display-name
const MemoizedCategoryImage = () => {
	return (
		<img
			src={"/icon_category_barber.png"}
			alt="Category Icon"
			width={171}
			height={171}
		/>
	);
};

// eslint-disable-next-line react/display-name
const MemoizedLogo = () => {
	return (
		<img
			src={"/company_logo_dark.png"}
			alt="PSI Logo"
			width={519}
			height={346}
		/>
	);
};

const Footer = ({ footerText }: { footerText: string }) => (
	<div className="bg-white h-[214px] flex items-center justify-center">
		<MemoizedCategoryImage />
		<span className="text-[#002a4e] text-[54px] font-semibold italic tracking-wide">
			{footerText}
		</span>
	</div>
);

const CardContent = ({
	duration,
	title,
}: { duration: string; title: string }) => (
	<div className="flex-grow flex flex-col">
		<div className="self-start bg-[#e1eef9] text-[#002a4e] text-xs font-extrabold p-1 transform -translate-y-1/2 -translate-x-1/2 rotate-[-45deg] origin-top-left">
			{duration}
		</div>
		<div className="flex-grow flex flex-col items-center justify-center p-4">
			<MemoizedLogo />
			<div className="text-white text-[178px] font-bold text-center">
				{title}
			</div>
		</div>
	</div>
);

type IconItem = {
	title: string;
	footerText: string;
	duration: string;
};

const Ribbon = ({ duration }: { duration: string }) => (
	<div
		style={{
			backgroundColor: ribbonBgColor,
		}}
		className="absolute left-[-200px] top-[100px] w-[800px] px-[200px] py-4 flex items-center justify-center rotate-[-45deg]"
	>
		<p
			style={{
				color: ribbonTextColor,
			}}
			className="tracking-[3.50px] text-7xl font-extrabold italic text-center leading-tight max-w-full break-words"
		>
			{duration}
		</p>
	</div>
);

export default function IconGenerator() {
	const [items, setItems] = useState<IconItem[]>(icons);

	const iconRef = useRef<HTMLDivElement>(null);

	const generateIcons = async () => {
		if (!iconRef.current) return;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];

			const previewItem = { ...item };
			setItems([previewItem, ...items.slice(1)]);

			// await new Promise((resolve) => setTimeout(resolve, 5000));

			try {
				const dataUrl = await toPng(iconRef.current, { pixelRatio: 3 });
				const link = document.createElement("a");
				link.download = `icon-${item.title.replace(/\s+/g, "-").toLowerCase()}.png`;
				link.href = dataUrl;
				link.click();
			} catch (error) {
				console.error("Error generating icon:", error);
			}
		}

		setItems([items[0], ...items.slice(1)]);
	};

	const cta = `Generate ${items.length} icons`;

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<div className="mb-4">
				<div
					ref={iconRef}
					className="w-[1024px] h-[1024px] border-8 border-[#002643] overflow-hidden flex flex-col relative"
					style={{ backgroundColor: iconBgColor }}
				>
					<Ribbon duration={items[0].duration} />
					<CardContent duration={items[0].duration} title={items[0].title} />
					<Footer footerText={items[0].footerText} />
				</div>
			</div>

			<Button onClick={generateIcons}>{cta}</Button>
		</div>
	);
}
