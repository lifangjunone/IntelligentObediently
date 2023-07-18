# 借助node镜像中安装依赖并完成构建
FROM node:16.12.0 as build
WORKDIR /tmp
COPY package.json ./
RUN npm config  set registry https://registry.npm.taobao.org && npm install --legacy-peer-deps
COPY . .
RUN npm run build
# 通过nginx进行部署，并将上一个镜像中的构建好的目标文件复制到nginx的root目录下
FROM nginx:stable-alpine as deply
COPY --from=build /tmp/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
