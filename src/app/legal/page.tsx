"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";



export default function LegalDocumentsPage() {
  return (
    <div>            
      <Header>
      </Header>
          <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12 text-foreground">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Documentação Legal
        </span>
        <h1 className="text-4xl font-bold tracking-tight">Políticas e Termos de Uso</h1>
        <p className="text-muted-foreground text-sm">
          Última atualização: Setembro de 2026. Conheça as diretrizes de privacidade, regras de serviço e uso de cookies do PetTracker.
        </p>
      </div>

      <Separator />

      {/* 1. Política de Privacidade */}
      <section id="privacidade" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">1. Política de Privacidade</h2>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Compromisso com a sua privacidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              A sua privacidade é fundamental para nós do <strong>PetTracker</strong>. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais e os dados cadastrados dos seus pets.
            </p>
            <h3 className="font-semibold text-foreground">1.1. Dados Coletados</h3>
            <p>
              Coletamos informações fornecidas diretamente por você no cadastro (nome, e-mail, senha criptografada via BCrypt) e dados referentes aos animais de estimação (nome, raça, histórico de peso, vacinas e imagens enviadas via AWS S3).
            </p>
            <h3 className="font-semibold text-foreground">1.2. Exclusão de Conta e Dados</h3>
            <p>
              Você tem total controle sobre os seus dados. Caso decida encerrar sua conta, o processo de exclusão definitiva de seus dados e registros vinculados pode ser acionado diretamente pelas configurações da sua conta ou via suporte/backend, utilizando a rota segura de remoção (<code className="bg-muted px-1 py-0.5 rounded text-xs">DELETE /user/me</code>).
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 2. Termos de Serviço */}
      <section id="termos" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">2. Termos de Serviço</h2>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Regras de Utilização da Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Ao acessar ou utilizar o PetTracker, você concorda em cumprir estes Termos de Serviço. A plataforma é destinada ao controle pessoal e organização de rotinas e histórico de animais de estimação.
            </p>
            <h3 className="font-semibold text-foreground">2.1. Responsabilidade do Usuário</h3>
            <p>
              O usuário é responsável por manter a segurança de suas credenciais de acesso. O PetTracker não substitui o acompanhamento veterinário profissional para diagnósticos de saúde animal.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 3. Política de Cookies */}
      <section id="cookies" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">3. Política de Cookies</h2>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Como utilizamos cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Utilizamos cookies estritamente necessários para o funcionamento da autenticação via tokens e manutenção da sua sessão ativa no painel administrativo (Dashboard), além de preferências de navegação.
            </p>
            <p>
              Você pode desativar os cookies nas configurações do seu navegador, porém isso poderá afetar a sua capacidade de realizar login ou acessar rotas protegidas da aplicação.
            </p>
          </CardContent>
        </Card>
      </section>

    </div></div>

  );
}