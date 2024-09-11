import type { IconItem } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type GeneratorProps = {
	items: IconItem[];
	setItems: React.Dispatch<React.SetStateAction<IconItem[]>>;
	bgColor: string;
	setBgColor: React.Dispatch<React.SetStateAction<string>>;
};

export function IconForm({
	items,
	setItems,
	bgColor,
	setBgColor,
}: GeneratorProps) {
	const addItem = () => {
		setItems([...items, { title: "", footerText: "", duration: "1 MONTH" }]);
	};

	const updateItem = (index: number, field: keyof IconItem, value: string) => {
		const newItems = [...items];
		newItems[index][field] = value;
		setItems(newItems);
	};

	return (
		<div>
			<div className="mb-4">
				<Label htmlFor="bgColor">Background Color</Label>
				<Input
					id="bgColor"
					type="color"
					value={bgColor}
					onChange={(e) => setBgColor(e.target.value)}
					className="w-full"
				/>
			</div>

			{items.map((item, index) => (
				<Card key={index} className="p-4 mb-4">
					<Label htmlFor={`title-${index}`}>Title</Label>
					<Input
						id={`title-${index}`}
						value={item.title}
						onChange={(e) => updateItem(index, "title", e.target.value)}
						className="mb-2"
					/>
					<Label htmlFor={`footer-${index}`}>Footer Text</Label>
					<Input
						id={`footer-${index}`}
						value={item.footerText}
						onChange={(e) => updateItem(index, "footerText", e.target.value)}
						className="mb-2"
					/>
					<Label htmlFor={`duration-${index}`}>Duration</Label>
					<Select
						value={item.duration}
						onValueChange={(value) => updateItem(index, "duration", value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select duration" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1 MONTH">1 MONTH</SelectItem>
							<SelectItem value="3 MONTHS">3 MONTHS</SelectItem>
							<SelectItem value="6 MONTHS">6 MONTHS</SelectItem>
							<SelectItem value="1 YEAR">1 YEAR</SelectItem>
						</SelectContent>
					</Select>
				</Card>
			))}

			<Button onClick={addItem} className="mb-4">
				Add Item
			</Button>
		</div>
	);
}
