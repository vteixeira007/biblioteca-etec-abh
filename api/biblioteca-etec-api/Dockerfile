FROM openjdk:17-jdk-alpine3.14
WORKDIR /app

# Copia o JAR principal e o diretório de dependências
COPY target/* /app
COPY . .

# Define o classpath para incluir as dependências



# Comando de execução
ENTRYPOINT ["java", "-jar", "/app/app.jar"]