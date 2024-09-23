/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

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
			src={"/construction.png"}
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

const Footer = ({ footerText }: { footerText: string }) => {
	const footerTextRef = useRef<HTMLSpanElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const resizeFooterText = () => {
			const element = footerTextRef.current;
			if (!element) return;

			let fontSize = 112;
			element.style.fontSize = `${fontSize}px`;

			while (element.scrollWidth > element.offsetWidth && fontSize > 10) {
				fontSize--;
				element.style.fontSize = `${fontSize}px`;
			}
		};

		resizeFooterText();
		window.addEventListener("resize", resizeFooterText);
		return () => window.removeEventListener("resize", resizeFooterText);
	}, [footerText]);

	return (
		<div className="bg-white h-[214px] flex items-center justify-center px-4">
			<MemoizedCategoryImage />
			<span
				ref={footerTextRef}
				className="text-[#002a4e] font-semibold italic tracking-wide whitespace-nowrap overflow-hidden"
				style={{ fontSize: "112px" }}
			>
				{footerText}
			</span>
		</div>
	);
};

const CardContent = ({
	duration,
	title,
	subtitle,
}: { duration: string; title?: string; subtitle?: string }) => {
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizeText = (
			element: HTMLElement | null,
			initialFontSize: number,
		) => {
			if (!element) return;

			let fontSize = initialFontSize;
			element.style.fontSize = `${fontSize}px`;

			while (element.scrollHeight > element.offsetHeight && fontSize > 10) {
				fontSize--;
				element.style.fontSize = `${fontSize}px`;
			}
		};

		const resizeAll = () => {
			if (title) resizeText(titleRef.current, 178);
			if (subtitle) resizeText(subtitleRef.current, 120);
		};

		resizeAll();
		window.addEventListener("resize", resizeAll);
		return () => window.removeEventListener("resize", resizeAll);
	}, [title, subtitle]);

	return (
		<div className="flex-grow flex flex-col">
			<div className="self-start bg-[#e1eef9] text-[#002a4e] text-xs font-extrabold p-1 transform -translate-y-1/2 -translate-x-1/2 rotate-[-45deg] origin-top-left">
				{duration}
			</div>
			<div className="flex-grow flex flex-col items-center p-4 justify-center mt-16">
				<MemoizedLogo />
				<div className="text-white text-center flex flex-col items-center px-20 flex-grow justify-end">
					{title && (
						<div
							ref={titleRef}
							className="font-extrabold leading-none h-[178px] overflow-hidden"
							style={{ fontSize: "178px" }}
						>
							{title}
						</div>
					)}
					{subtitle && (
						<div
							ref={subtitleRef}
							className="font-bold leading-tight h-[178px] overflow-hidden"
							style={{ fontSize: "120px" }}
						>
							{subtitle}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

type IconItem = {
	title?: string;
	subtitle?: string;
	footerText: string;
	ribbonText: string;
};

const Ribbon = ({ ribbonText }: { ribbonText: string }) => {
	const textRef = useRef<HTMLParagraphElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const resizeText = () => {
			const element = textRef.current;
			if (!element) return;

			let fontSize = 90;
			element.style.fontSize = `${fontSize}px`;

			while (element.scrollWidth > element.offsetWidth && fontSize > 10) {
				fontSize--;
				element.style.fontSize = `${fontSize}px`;
			}
		};

		resizeText();
		window.addEventListener("resize", resizeText);
		return () => window.removeEventListener("resize", resizeText);
	}, [ribbonText]);

	return (
		<div
			style={{
				backgroundColor: ribbonBgColor,
			}}
			className="absolute left-[-200px] top-[100px] w-[750px] px-[200px] py-4 flex items-center justify-center rotate-[-45deg]"
		>
			<p
				ref={textRef}
				style={{
					color: ribbonTextColor,
				}}
				className="tracking-[3.50px] font-extrabold italic text-center leading-tight max-w-full whitespace-nowrap"
			>
				{ribbonText}
			</p>
		</div>
	);
};

export default function IconGenerator() {
	const [localItem, setItem] = useState<IconItem>(icons[0]);

	const iconRef = useRef<HTMLDivElement>(null);

	const [shouldStartExport, setShouldStartExport] = useState(false);
	const generateIcons = async () => {
		console.log("iconFR", iconRef.current);
		if (!iconRef.current) return;

		setShouldStartExport(true);

		for (let i = 0; i < icons.length; i++) {
			const item = icons[i];

			const previewItem = { ...item };
			setItem(previewItem);

			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		setShouldStartExport(false);
	};

	useEffect(() => {
		if (shouldStartExport) {
			const generateIcon = async () => {
				try {
					if (iconRef.current) {
						const dataUrl = await toPng(iconRef.current, { pixelRatio: 3 });
						const link = document.createElement("a");
						const title =
							localItem.title?.replace(/\s+/g, "-").toLowerCase() || "";
						const subtitle =
							localItem.subtitle?.replace(/\s+/g, "-").toLowerCase() || "";
						const ribbonText =
							localItem.ribbonText?.replace(/\s+/g, "-").toLowerCase() || "";
						const fileName = `${title}${title ? "-" : ""}${subtitle}${subtitle ? "-" : ""}${ribbonText}`;
						console.log("fileName", fileName);
						link.download = `icon-${fileName}.png`;
						link.href = dataUrl;
						link.click();
					}
				} catch (error) {
					console.error("Error generating icon:", error);
				}
			};
			generateIcon();
		}
	}, [shouldStartExport, localItem]);

	const cta = `Generate ${icons.length} icons`;

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<div className="mb-4">
				<div
					ref={iconRef}
					className="w-[1024px] h-[1024px] border border-[#002643] overflow-hidden flex flex-col relative"
					style={{ backgroundColor: iconBgColor }}
				>
					<Ribbon ribbonText={localItem.ribbonText} />
					<CardContent
						duration={localItem.ribbonText}
						title={localItem.title}
						subtitle={localItem.subtitle}
					/>
					<Footer footerText={localItem.footerText} />
				</div>
			</div>

			<Button onClick={generateIcons}>{cta}</Button>
		</div>
	);
}
