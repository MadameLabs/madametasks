import { expect, it } from "vitest";
import { createMdbase } from "@mdbase-dev/sdk";
import manifest from "../generated/mdbase-app.json";

// MadameTasks publica só a web: o manifesto declara o retorno de login da web,
// não o `dev.tasknotes.app://` do app nativo do upstream.
it("accepts the declared MadameTasks web return URL", () => {
  const returnUrl = "https://tasks.madamelabs.com.br/auth/mdbase/callback";
  expect(manifest.redirect_uris).toContain(returnUrl);
  // Construction is IO-free; no Worker, browser, account or registration.
  expect(() =>
    createMdbase(
      {
        id: "5cdfa020-c201-4da8-845a-f2cc9969eade",
        name: "MadameTasks",
        origin: "https://tasks.madamelabs.com.br",
        environment: "production",
        manifest,
      },
      { signIn: { open: () => {}, returnUrl } },
    ),
  ).not.toThrow();
});
