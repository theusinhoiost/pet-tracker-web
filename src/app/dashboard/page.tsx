import { PetCard } from "@/components/pet-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { LuBell, LuActivity, LuHeart } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Seus Pets",
};

// Mock de dados (Simulando o que viria do NestJS)
const MY_PETS = [
  {
    id: "1",
    name: "Rex",
    breed: "Golden Retriever",
    nextVaccine: "12/04/2026",
    status: "Em dia",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Gato Persa",
    nextVaccine: "20/05/2026",
    status: "Alerta",
  },
  {
    id: "3",
    name: "Luna",
    breed: "Gato Persa",
    nextVaccine: "20/05/2026",
    status: "Alerta",
  },
  {
    id: "24",
    name: "Luna",
    breed: "Gato Persa",
    nextVaccine: "20/05/2026",
    status: "Alerta",
  },
  {
    id: "234",
    name: "Luna",
    breed: "Gato Persa",
    nextVaccine: "20/05/2026",
    status: "Alerta",
  },
  {
    id: "255",
    name: "Luna",
    breed: "Gato Persa",
    nextVaccine: "20/05/2026",
    status: "Alerta",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* SEÇÃO DE SUMÁRIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pets Ativos</CardTitle>
            <LuHeart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registados na tua conta
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Próximos
            </CardTitle>
            <LuBell className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Vacina da Luna a expirar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Última Atividade
            </CardTitle>
            <LuActivity className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hoje</div>
            <p className="text-xs text-muted-foreground mt-1">
              Consulta de rotina do Rex
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
          <Link href={"/addpet"}>
            <Button size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Adicionar Pet
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MY_PETS.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              nextVaccineDate={pet.nextVaccine}
              id={pet.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
