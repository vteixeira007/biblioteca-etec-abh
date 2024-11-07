FROM maven:3.8.5-openjdk-17 AS build


# Definir o diretório de trabalho na etapa de construção
WORKDIR /app

# Copiar o arquivo pom.xml e os arquivos de dependências
COPY pom.xml .
COPY src ./src


RUN mvn clean package -DskipTests

# Etapa de execução
FROM openjdk:17-jdk-slim

# Definir o diretório de trabalho na etapa de execução
WORKDIR /app

# Expor a porta 8090
EXPOSE 8090

# Copiar o JAR da etapa de construção para a imagem final
COPY --from=build /app/target/*.jar app.jar

# Comando de execução
ENTRYPOINT ["java", "-jar", "app.jar"]