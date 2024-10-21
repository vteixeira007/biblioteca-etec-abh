FROM openjdk:17-jdk-alpine3.14
WORKDIR /app

# Copia o JAR principal e o diretório de dependências
COPY target/* /app
COPY . .

# Define o classpath para incluir as dependências

# Executar a construção do Maven para criar o JAR
RUN mvn clean package -DskipTests

# Etapa de execução
FROM openjdk:17-jdk-slim
WORKDIR /app

EXPOSE 8080

COPY --from=build /app/target/*.jar app.jar
# Comando de execução
ENTRYPOINT ["java", "-jar", "app.jar"]