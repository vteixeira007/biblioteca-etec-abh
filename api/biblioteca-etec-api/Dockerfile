# Etapa de build usando Maven
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app

# Copia o arquivo pom.xml e as dependências primeiro para aproveitar o cache do Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o restante do código do projeto
COPY src ./src

# Realiza o build do projeto, ignorando os testes para evitar problemas durante o build
RUN mvn clean package -DskipTests

# Etapa final para rodar o aplicativo
FROM openjdk:17-jdk-alpine3.14
WORKDIR /app

# Copia o JAR gerado na etapa anterior para a imagem final
COPY --from=build /app/target/*.jar app.jar

# Comando para iniciar o aplicativo
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
