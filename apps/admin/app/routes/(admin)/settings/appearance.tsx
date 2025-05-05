import { Separator } from "@repo/ui/separator";
import { useTranslation } from "react-i18next";

import { AppearanceForm } from "./components/appearance-form";

export default function Component() {
	const { t } = useTranslation("settings");

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">{t("nav.appearance")}</h3>
				<p className="text-sm text-muted-foreground">
					{t("sections.appearance.description")}
				</p>
			</div>
			<Separator />
			<AppearanceForm />
		</div>
	);
}
