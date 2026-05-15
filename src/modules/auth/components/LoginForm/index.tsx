import { useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoginByEmailFormFields } from "@auth/components/LoginForm/fields";
import {
  emailFormSchema,
  type EmailFormData,
} from "@auth/components/LoginForm/schema";
import { useLoginMutation } from "@auth/api/authApi";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IApiErrorData {
  errors?: Array<{
    msg?: string;
  }>;
  message?: string;
}

interface IApiError {
  data?: IApiErrorData;
}

const getLoginErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== "object") {
    return fallback;
  }

  const apiError = error as IApiError;
  const firstBackendError = apiError.data?.errors?.[0]?.msg;

  return firstBackendError ?? apiError.data?.message ?? fallback;
};

export const LoginForm = () => {
  const { t } = useTranslation("auth", { keyPrefix: "LoginForm" });

  const [login, { isLoading }] = useLoginMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EmailFormData>({
    defaultValues: {
      [LoginByEmailFormFields.EMAIL]: "",
      [LoginByEmailFormFields.PASSWORD]: "",
    },
    resolver: valibotResolver(emailFormSchema),
  });

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    setFormError(null);

    try {
      const response = await login(data).unwrap();
      enqueueSnackbar(response.message || t("success"), {
        variant: "success",
        preventDuplicate: true,
      });
    } catch (error) {
      setFormError(getLoginErrorMessage(error, t("error")));
    }
  };

  return (
    <Card className="w-full max-w-[440px] border border-border/80 shadow-xl shadow-foreground/5">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label
              className="text-xs font-semibold tracking-widest text-foreground uppercase"
              htmlFor={LoginByEmailFormFields.EMAIL}
            >
              {t("fields.email.label")}
            </label>
            <Input
              id={LoginByEmailFormFields.EMAIL}
              type="email"
              autoComplete="email"
              placeholder={t("fields.email.placeholder")}
              aria-invalid={Boolean(errors.email)}
              disabled={isLoading}
              {...register(LoginByEmailFormFields.EMAIL)}
            />
            {errors.email?.message ? (
              <p className="text-xs leading-relaxed text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label
              className="text-xs font-semibold tracking-widest text-foreground uppercase"
              htmlFor={LoginByEmailFormFields.PASSWORD}
            >
              {t("fields.password.label")}
            </label>
            <div className="relative">
              <Input
                id={LoginByEmailFormFields.PASSWORD}
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                placeholder={t("fields.password.placeholder")}
                className="pr-11"
                aria-invalid={Boolean(errors.password)}
                disabled={isLoading}
                {...register(LoginByEmailFormFields.PASSWORD)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1 right-1 h-9 w-9"
                aria-label={
                  isPasswordVisible
                    ? t("actions.hidePassword")
                    : t("actions.showPassword")
                }
                onClick={() => setIsPasswordVisible((value) => !value)}
                disabled={isLoading}
              >
                {isPasswordVisible ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.password?.message ? (
              <p className="text-xs leading-relaxed text-destructive">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                className="size-4 rounded-none border-input accent-foreground"
                disabled={isLoading}
              />
              {t("fields.rememberMe")}
            </label>
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              href="mailto:support@example.com"
            >
              {t("actions.forgotPassword")}
            </a>
          </div>

          {formError ? (
            <div className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm leading-relaxed text-destructive">
              {formError}
            </div>
          ) : null}

          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
            {isLoading ? t("actions.submitting") : t("actions.submit")}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="border-t text-sm leading-relaxed text-muted-foreground">
        {t("footer")}
      </CardFooter>
    </Card>
  );
};
