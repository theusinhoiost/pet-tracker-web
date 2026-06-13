"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  User,
  ShieldCheck,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/header";
import { LanguageSwitcher } from "@/components/ui/language-selector";
import ThemeSettingsChanger from "@/components/ui/settings/theme-settings-changer";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-3">
          <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Configurações
          </span>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Gerencie sua conta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Personalize preferências, segurança e notificações.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <Card className="h-fit rounded-3xl border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="mb-6 flex items-center gap-3 rounded-2xl border bg-muted/40 p-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>MI</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">Matheus Iost</p>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                <SidebarItem icon={User} label="Perfil" active />

                <SidebarItem icon={Bell} label="Notificações" />

                <SidebarItem icon={ShieldCheck} label="Privacidade" />

                <SidebarItem icon={Lock} label="Segurança" />

                <SidebarItem icon={Palette} label="Aparência" />

                <SidebarItem icon={Smartphone} label="Dispositivos" />
              </nav>
            </CardContent>
          </Card>

          {/* CONTENT */}
          <div className="space-y-6">
            {/* PROFILE */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Informações pessoais
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Atualize os dados da sua conta.
                    </p>
                  </div>

                  <User className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input defaultValue="Matheus Iost" />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="matheus@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Input defaultValue="Português (Brasil)" />
                  </div>

                  <div className="space-y-2">
                    <Label>Localização</Label>
                    <Input defaultValue="São Paulo, Brasil" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-xl">Salvar alterações</Button>
                </div>
              </CardContent>
            </Card>
            {/* LANGUAGE */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Seleção de idioma</h2>
                    <p className="text-sm text-muted-foreground">
                      Escolha o idioma do seu texto
                    </p>
                  </div>
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />
                <LanguageSwitcher />
              </CardContent>
            </Card>
            {/* SECURITY */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Segurança</h2>

                    <p className="text-sm text-muted-foreground">
                      Proteja sua conta e altere sua senha.
                    </p>
                  </div>

                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Senha</Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      defaultValue="123456789"
                      className="pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <SettingSwitch
                    icon={ShieldCheck}
                    title="Autenticação em 2 fatores"
                    description="Adicione uma camada extra de segurança."
                  />

                  <SettingSwitch
                    icon={Smartphone}
                    title="Login por biometria"
                    description="Permitir acesso rápido em dispositivos móveis."
                  />
                </div>
              </CardContent>
            </Card>

            {/* APPEARANCE */}
            <ThemeSettingsChanger />

            {/* NOTIFICATIONS */}
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Notificações</h2>

                    <p className="text-sm text-muted-foreground">
                      Escolha como deseja receber avisos.
                    </p>
                  </div>

                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <SettingSwitch
                    icon={Mail}
                    title="Notificações por email"
                    description="Receba atualizações importantes por email."
                  />

                  <SettingSwitch
                    icon={Bell}
                    title="Push notifications"
                    description="Alertas em tempo real no navegador."
                  />

                  <SettingSwitch
                    icon={Globe}
                    title="Novidades da plataforma"
                    description="Receba anúncios e novos recursos."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm transition-all
      ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      <ChevronRight className="h-4 w-4 opacity-60" />
    </button>
  );
}

function SettingSwitch({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <Switch defaultChecked />
    </div>
  );
}
