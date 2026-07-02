import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LuPawPrint,
  LuCalendarHeart,
  LuSyringe,
  LuPill,
  LuBellRing,
  LuLogIn,
} from "react-icons/lu";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function HomePage() {
  const features = [
    {
      icon: LuSyringe,
      title: "Controle de Vacinas",
      description: "Histórico completo de vacinas aplicadas e próximas doses.",
    },
    {
      icon: LuPill,
      title: "Medicação e Vermífugos",
      description: "Gerencie cronogramas de remédios e evite esquecimentos.",
    },
    {
      icon: LuCalendarHeart,
      title: "Histórico Médico",
      description:
        "Registre consultas, exames, peso e observações importantes.",
    },
    {
      icon: LuBellRing,
      title: "Alertas Inteligentes",
      description:
        "Receba notificações antes do vencimento de qualquer compromisso.",
    },
  ];

  return (
    <div className="min-h-screen bg-background/80 text-foreground flex flex-col transition-colors duration-300">
      {/* --- HEADER --- */}
      <Header>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Cadastrar</Link>
          </Button>
        </div>
      </Header>

      <main className="grow">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          {/* Elemento de background decorativo usando a cor primária */}
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10" />

          <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <Badge
              variant="outline"
              className="mb-6 px-3 py-1 gap-1.5 shadow-sm"
            >
              <LuPawPrint className="h-3.5 w-3.5" />O Guardião da Saúde do seu
              Pet
            </Badge>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter max-w-3xl leading-tight text-foreground">
              Cuidar de quem você ama nunca foi tão{" "}
              <span className="text-primary">fácil e organizado</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Centralize vacinas, vermífugos, consultas e receba alertas
              automáticos. A carteira digital completa para garantir a
              longevidade do seu melhor amigo.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="text-lg px-8 h-12 w-full sm:w-auto"
                asChild
              >
                <Link href="/signup">Começar Agora</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-12 gap-2 w-full sm:w-auto"
                asChild
              >
                <Link href="/dashboard">
                  <LuLogIn className="h-5 w-5" />
                  Acessar Painel
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase">
              Funcionalidades
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Tudo que seu pet precisa
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
              Diga adeus às carteirinhas de papel perdidas e ao estresse de
              esquecer datas importantes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-card-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="border-t bg-muted/50 mx-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-10 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left ">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Pronto para organizar a vida do seu pet?
              </h3>
              <p className="text-muted-foreground mt-2">
                Crie sua conta gratuitamente em menos de 1 minuto.
              </p>
            </div>
            <Button
              size="lg"
              className="whitespace-nowrap w-full md:w-auto"
              asChild
            >
              <Link href="/signup">Quero me Cadastrar</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
