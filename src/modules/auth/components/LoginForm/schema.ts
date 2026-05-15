import { getTranslation } from "@common/index";
import * as v from "valibot";
import { LoginByEmailFormFields } from "./fields";
import config from "@config/index";

const t = getTranslation("auth");

const emailFormSchema = v.object({
  [LoginByEmailFormFields.EMAIL]: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty(t("LoginForm.validation.emailRequired")),
    v.email(t("LoginForm.validation.emailInvalid")),
    v.maxLength(255, t("LoginForm.validation.emailTooLong")),
  ),

  [LoginByEmailFormFields.PASSWORD]: v.pipe(
    v.string(),
    v.nonEmpty(t("LoginForm.validation.passwordRequired")),
    v.minLength(8, t("LoginForm.validation.passwordMinLength")),
    v.maxLength(64, t("LoginForm.validation.passwordMaxLength")),
    v.regex(
      config.VALIDATION.PASSWORD_REGEX,
      t("LoginForm.validation.passwordWeak"),
    ),
  ),
});

type EmailFormData = v.InferOutput<typeof emailFormSchema>;

export { emailFormSchema };
export type { EmailFormData };
