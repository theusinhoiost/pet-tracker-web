import { PetCard } from "@/components/pet-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotifications, getUnreadCount } from "@/services/api/notification";
import { getAllPets } from "@/services/api/pet";

import { PetCardProps } from "@/types/pet-card";
import { NotificationDto } from "@/types/zod/notification";

import { PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { LuBell, LuActivity, LuHeart } from "react-icons/lu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard - Seus Pets",
};

export default async function DashboardPage() {
  let pets: PetCardProps[] = [];
  let unreadCount = 0;
  let latestNotification: NotificationDto | null = null;
  let error = false;

  try {
    const [petsData, count, notifications] = await Promise.all([
      getAllPets(),
      getUnreadCount(),
      getNotifications(),
    ]);

    pets = petsData;
    unreadCount = count;

    // Pega a notificação não lida mais recente
    const unread = notifications.filter((n) => !n.read);
    if (unread.length > 0) {
      latestNotification = unread[0];
    }
  } catch (err) {
    console.error("Erro ao carregar dados do dashboard:", err);
    error = true;
  }

  return (
    <div className="mx-8 m-auto">
      <div className="space-y-12">
        {/* SEÇÃO DE SUMÁRIO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pets Ativos */}
          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pets Ativos</CardTitle>
              <LuHeart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registados na tua conta
              </p>
            </CardContent>
          </Card>

          {/* Alertas Próximos */}
          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Alertas Próximos
              </CardTitle>
              <LuBell className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {latestNotification
                  ? latestNotification.title
                  : unreadCount === 0
                    ? "Nenhum alerta no momento"
                    : "Você tem alertas pendentes"}
              </p>
            </CardContent>
          </Card>

          {/* Última Atividade */}
          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Última Atividade
              </CardTitle>
              <LuActivity className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestNotification ? "Recente" : "—"}
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {latestNotification
                  ? latestNotification.message
                  : "Nenhuma atividade recente"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO DOS PETS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Os Meus Animais
            </h2>
            <Link href="/addpet">
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Adicionar Pet
              </Button>
            </Link>
          </div>

          {error ? (
            <Card className="p-8 text-center">
              <p className="text-destructive">Erro ao carregar seus pets.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Tente recarregar a página.
              </p>
            </Card>
          ) : pets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  id={pet.id}
                  name={pet.name}
                  race={pet.race || "Sem raça definida"}
                  nextVaccineDate={pet.nextVaccineDate}
                  imageUrl={pet.imageUrl}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                🐾
              </div>
              <h3 className="text-xl font-semibold">
                Ainda não tem pets cadastrados
              </h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Adicione seu primeiro animal de estimação
              </p>
              <Link href="/addpet">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Cadastrar Primeiro Pet
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
