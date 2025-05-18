import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@poketto/ui/select";
import { useTranslation } from "react-i18next";

import { languages } from "@/i18n";

export const LanguageSwitch = () => {
	const { i18n, t } = useTranslation("common");

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<Select value={i18n.language} onValueChange={changeLanguage}>
			<SelectTrigger className="w-[180px]">
				<SelectValue
					placeholder={t("select_language")}
					className="w-[180px] truncate"
				/>
			</SelectTrigger>
			<SelectContent className="w-[180px]">
				{languages.map((language) => (
					<SelectItem
						key={language.value}
						value={language.value}
						className="truncate"
					>
						{language.icon} {language.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
