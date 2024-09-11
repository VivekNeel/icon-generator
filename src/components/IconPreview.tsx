import { useRef, useState } from "react";
import Image from "next/image";
import type { IconItem } from "./types";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

const LOGO_URL =
	"https://memorang-prod-media.s3.amazonaws.com/app-logos/psi/company_logo_dark.png";
const CATEGORY_ICON_URL =
	"https://icon.memorang.com/icon/icon_category_barber.png";

type PreviewProps = {
	bgColor: string;
	items: IconItem[];
};

export function IconPreview({ items, bgColor }: PreviewProps) {
	const iconRef = useRef<HTMLDivElement>(null);
	const [logoError, setLogoError] = useState(false);
	const [categoryIconError, setCategoryIconError] = useState(false);

	const generateIcon = async () => {
		if (!iconRef.current) return;
		try {
			const dataUrl = await toPng(iconRef.current, { pixelRatio: 3 });
			const link = document.createElement("a");
			link.download = "icon.png";
			link.href = dataUrl;
			link.click();
		} catch (error) {
			console.error("Error generating icon:", error);
		}
	};

	return (
		<div className="mb-4">
			<h2 className="text-xl font-bold mb-2">Preview</h2>
			<div
				ref={iconRef}
				className="w-[300px] h-[300px] rounded-2xl border-2 border-[#002643] overflow-hidden mb-4"
				style={{ backgroundColor: bgColor }}
			>
				<div className="relative w-full h-full flex flex-col">
					<div className="absolute top-0 left-0 w-full h-full">
						<div className="absolute top-0 left-0 bg-[#e1eef9] text-[#002a4e] text-xs font-extrabold p-1 transform -translate-y-1/2 -translate-x-1/2 rotate-[-45deg] origin-top-left">
							{item.duration}
						</div>
					</div>
					<div className="flex-grow flex flex-col items-center justify-center p-4">
						{logoError ? (
							<div className="w-1/2 h-20 bg-gray-200 flex items-center justify-center mb-4">
								Logo
							</div>
						) : (
							<Image
								src={LOGO_URL}
								alt="PSI Logo"
								width={150}
								height={100}
								className="mb-4"
								onError={() => setLogoError(true)}
							/>
						)}
						<div className="text-white text-2xl font-bold text-center">
							{item.title}
						</div>
					</div>
					<div className="bg-white h-[60px] flex items-center justify-center">
						{categoryIconError ? (
							<div className="w-10 h-10 bg-gray-200 flex items-center justify-center mr-2">
								Icon
							</div>
						) : (
							<Image
								src={CATEGORY_ICON_URL}
								alt="Category Icon"
								width={40}
								height={40}
								className="mr-2"
								onError={() => setCategoryIconError(true)}
							/>
						)}
						<span className="text-[#002a4e] text-sm font-semibold">
							{item.footerText}
						</span>
					</div>
				</div>
			</div>
			<Button onClick={generateIcon}>Generate Icon</Button>
		</div>
	);
}
