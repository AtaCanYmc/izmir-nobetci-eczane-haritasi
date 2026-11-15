.DEFAULT_GOAL := help
.PHONY: help install dev build preview type-check lint lint-fix clean clean-all check

help: ## Mevcut komutlari ve aciklamalarini listeler
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Bagimliliklari yukler
	npm install

dev: ## Yerel gelistirme sunucusunu baslatir (Vite)
	npm run dev

build: ## TypeScript kontrolu yapar ve uretim paketini derler (dist)
	npm run build

type-check: ## TypeScript tip kontrolunu calistirir
	npm run type-check

lint: ## ESLint kod kalitesi denetimini calistirir
	npm run lint

lint-fix: ## ESLint ile otomatik duzeltilebilir hatalari onarir
	npm run lint-fix

preview: ## Uretim derlemesini yerel ortamda onizler
	npm run preview

check: type-check build ## CI oncesi tip kontrolu ve build dogrulamasini calistirir

clean: ## Derleme ciktilarini (dist) temizler
	rm -rf dist

clean-all: clean ## Derleme ciktilarini ve node_modules dizinini temizler
	rm -rf node_modules
