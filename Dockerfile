FROM node:lts-bookworm-slim as builder

WORKDIR /
COPY . /
RUN npm install


RUN npm run build

# Use Nginx as the base image for serving the app
FROM nginx:alpine

# Copy the built app from the previous stage into the Nginx image
COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
