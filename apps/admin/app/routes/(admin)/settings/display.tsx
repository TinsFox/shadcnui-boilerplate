import { Separator } from "@poketto/ui/separator";
import { useTranslation } from "react-i18next";

import { DisplayForm } from "./components/display-form";

export default function Component() {
	const { t } = useTranslation("settings");
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">{t("nav.display")}</h3>
				<p className="text-sm text-muted-foreground">
					{t("sections.display.description")}
				</p>
			</div>
			<Separator />
			<DisplayForm />
		</div>
	);
}
