import { useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoginByEmailFormFields } from "@auth/components/LoginForm/fields";
import {
  emailFormSchema,
  type EmailFormData,
} from "@auth/components/LoginForm/schema";
import { APP_ROUTES } from "@config/routes";
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
import { useSnackbar } from "notistack";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

interface ILoginLocationState {
  from?: {
    pathname?: string;
    search?: string;
  };
}

export const LoginForm = () => {
  const { t } = useTranslation("auth", { keyPrefix: "LoginForm" });

  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ILoginLocationState | null;

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
      navigate(
        `${state?.from?.pathname ?? APP_ROUTES.HOME}${state?.from?.search ?? ""}`,
        { replace: true },
      );
    } catch (error) {
      enqueueSnackbar(t("loginFailed"), { variant: "error" });
    }
  };

  return (
    <Card className="relative z-10 w-full max-w-[440px] border border-glass-border bg-white/8 text-white shadow-[var(--shadow-frost-lg)] backdrop-blur-2xl">
      <CardHeader>
        <CardTitle className="text-2xl tracking-normal normal-case">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-surface-hero-muted">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label
              className="text-xs font-semibold tracking-widest text-brand-soft uppercase"
              htmlFor={LoginByEmailFormFields.EMAIL}
            >
              {t("fields.email.label")}
            </label>
            <Input
              id={LoginByEmailFormFields.EMAIL}
              type="email"
              autoComplete="email"
              placeholder={t("fields.email.placeholder")}
              className="border-glass-border bg-white/8 text-white placeholder:text-white/38"
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
              className="text-xs font-semibold tracking-widest text-brand-soft uppercase"
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
                className="border-glass-border bg-white/8 pr-11 text-white placeholder:text-white/38"
                aria-invalid={Boolean(errors.password)}
                disabled={isLoading}
                {...register(LoginByEmailFormFields.PASSWORD)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1 right-1 h-9 w-9 text-surface-hero-muted hover:bg-white/10 hover:text-white"
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

          {formError ? (
            <div className="border border-destructive/40 bg-destructive/15 px-3 py-2 text-sm leading-relaxed text-destructive">
              {formError}
            </div>
          ) : null}

          <Button
            className="w-full bg-brand text-brand-foreground hover:bg-brand-soft"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
            {isLoading ? t("actions.submitting") : t("actions.submit")}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="border-t border-glass-border text-sm leading-relaxed text-surface-hero-muted">
        {t("footer")}
      </CardFooter>
    </Card>
  );
};
