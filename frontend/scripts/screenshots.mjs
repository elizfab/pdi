/**
 * Captura screenshots full-page de cada aba do PDI (app.tsx único, sem rotas —
 * as "telas" são as abas do <pdi-tabs>, selecionadas via hash da URL: `/#<tabId>`,
 * lido em tabs.ts#ngOnInit).
 *
 * Uso:
 *   npm run screenshots              -> sobe ng serve na porta 6100, captura e encerra
 *   SHOTS_BASE_URL=http://localhost:6014 npm run screenshots
 *                                    -> usa um servidor ja rodando (nao sobe outro)
 *   SHOTS_DARK=1 npm run screenshots -> captura tambem no tema escuro
 *   SHOTS_VIEWPORTS=mobile,desktop npm run screenshots
 *                                    -> restringe os viewports capturados
 *   CHROME_PATH=/caminho/chrome      -> forca um binario especifico
 *
 * Saida: docs/screenshots/<NN>-<tab>-<viewport>.png (e -dark.png quando SHOTS_DARK=1)
 *
 * Nota: o tema do PDI e um signal local (pdi.ts#isDark), persistido em
 * localStorage sob a chave "pdi-theme" ('dark' | 'light') e lido em
 * initDarkMode() no ngOnInit — por isso a variante escura e obtida setando essa
 * chave antes de navegar (via page.evaluateOnNewDocument), e nao clicando no
 * botao de alternancia (#darkModeToggle, icon-only, sem texto "Modo escuro").
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'screenshots');
const PORT = process.env.SHOTS_PORT || '6100';
const BASE = (process.env.SHOTS_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const DARK = !!process.env.SHOTS_DARK;
const SETTLE_MS = 2000; // espera animacoes de entrada (data-anim) e transicao de tema

// Abas do PDI (pdi-tabs, ver tabs.ts#tabs) — a URL correspondente e `${BASE}/#${id}`.
const TABS = [
  { id: 'inicio', name: '01-inicio' },
  { id: 'sobre', name: '02-apresentacao' },
  { id: 'trajetoria', name: '03-trajetoria' },
  { id: 'conquistas', name: '04-conquistas' },
  { id: 'entregas', name: '05-entregas' },
  { id: 'metas-profissionais', name: '06-carreira' },
  { id: 'metas-pessoais', name: '07-pessoal' },
  { id: 'familia', name: '08-familia' },
  { id: 'sonhos', name: '09-sonhos' },
  { id: 'plano-acao', name: '10-execucao' },
  { id: 'jornada', name: '11-jornada' },
  { id: 'painel', name: '12-painel' },
  { id: 'evolucao', name: '13-evolucao' },
];

// Viewports para validar o layout mobile-first (grid/flex e breakpoints em rem
// definidos em pdi.scss: 23.75rem, 40rem, 53.75rem, 64rem).
const ALL_VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 834, height: 1194 },
  desktop: { width: 1440, height: 900 },
};
const VIEWPORTS = (process.env.SHOTS_VIEWPORTS || 'mobile,desktop')
  .split(',')
  .map((k) => k.trim())
  .filter((k) => ALL_VIEWPORTS[k])
  .map((k) => ({ key: k, ...ALL_VIEWPORTS[k] }));

const findChrome = () => {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const caches = [
    path.join(homedir(), '.cache/puppeteer/chrome'),
    path.join(homedir(), '.cache/ms-playwright'),
  ];
  for (const base of caches) {
    if (!existsSync(base)) continue;
    for (const dir of readdirSync(base).sort().reverse()) {
      for (const rel of [
        'chrome-linux64/chrome',
        'chrome-linux/chrome',
        'chrome-headless-shell-linux64/chrome-headless-shell',
      ]) {
        const bin = path.join(base, dir, rel);
        if (existsSync(bin)) return bin;
      }
    }
  }
  for (const bin of ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']) {
    if (existsSync(bin)) return bin;
  }
  return null;
};

const waitForServer = async (url, timeoutMs = 90000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return true;
    } catch {
      /* ainda subindo */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
};

const main = async () => {
  const chrome = findChrome();
  if (!chrome) {
    console.error('Chrome nao encontrado. Defina CHROME_PATH ou instale o Chromium.');
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  // Se SHOTS_BASE_URL nao foi passada, sobe um ng serve temporario
  let server = null;
  if (!process.env.SHOTS_BASE_URL) {
    console.log(`Subindo ng serve na porta ${PORT}...`);
    server = spawn('npx', ['ng', 'serve', '--port', PORT], {
      cwd: ROOT,
      stdio: 'ignore',
    });
  }

  try {
    if (!(await waitForServer(BASE))) {
      throw new Error(`Servidor nao respondeu em ${BASE}`);
    }
    console.log(
      `Servidor pronto em ${BASE}. Capturando ${TABS.length} abas x ${VIEWPORTS.length} viewport(s)${DARK ? ' x 2 temas' : ''}...`
    );

    const browser = await puppeteer.launch({
      executablePath: chrome,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    for (const viewport of VIEWPORTS) {
      for (const theme of DARK ? ['light', 'dark'] : ['light']) {
        const page = await browser.newPage();
        await page.setViewport({ width: viewport.width, height: viewport.height });
        // Define o tema ANTES de qualquer script do app rodar, replicando
        // exatamente o que pdi.ts#initDarkMode le do localStorage.
        await page.evaluateOnNewDocument((value) => {
          try {
            localStorage.setItem('pdi-theme', value);
          } catch {
            /* localStorage indisponivel */
          }
        }, theme);

        // Um unico carregamento por pagina: troca de aba e via clique no
        // botao role="tab", nao por navegacao de URL. Um goto() para uma URL
        // que so difere pelo hash NAO recarrega o documento (navegacao same-
        // document do browser), entao tabs.ts#ngOnInit nunca reexecutaria e
        // o painel visivel ficaria sempre travado na aba inicial.
        await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 60000 });
        await new Promise((r) => setTimeout(r, SETTLE_MS));

        for (const { id, name } of TABS) {
          await page.click(`#tab-${id}`);
          await new Promise((r) => setTimeout(r, SETTLE_MS));

          const suffix = theme === 'dark' ? '-dark' : '';
          const out = path.join(OUT_DIR, `${name}-${viewport.key}${suffix}.png`);
          await page.screenshot({ path: out, fullPage: true });
          console.log(`  ${out}`);
        }

        await page.close();
      }
    }

    await browser.close();
    console.log(`\nConcluido: screenshots em ${OUT_DIR}`);
  } finally {
    server?.kill('SIGTERM');
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
