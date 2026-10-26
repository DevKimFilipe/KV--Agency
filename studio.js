"use strict";
const form = document.getElementById("studio-form");
const output = document.getElementById("script-result");
const feedback = document.getElementById("feedback");
const get = (id) => document.getElementById(id).value.trim();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  output.value = `ROTEIRO — ${get("topic")}\n\nFormato: ${get("format")}\nPúblico: ${get("audience")}\nObjetivo: ${get("goal")}\n\n1. ABERTURA / GANCHO\nComece com uma pergunta ou afirmação que desperte o interesse de ${get("audience")} sobre ${get("topic")}.\n\n2. CONTEXTO\nApresente o tema de forma simples e mostre por que ele importa para esse público.\n\n3. MENSAGEM PRINCIPAL\n${get("message")}\n\n4. DESENVOLVIMENTO\nAcrescente um exemplo, uma demonstração ou um detalhe que ajude a tornar sua mensagem mais clara.\n\n5. ENCERRAMENTO / CHAMADA PARA AÇÃO\n${get("action")}\n\nNOTAS DE GRAVAÇÃO\nDefina as cenas, ajuste o texto ao seu tom de voz e revise as informações antes de gravar.`;
  document.getElementById("empty").hidden = true;
  document.getElementById("result").hidden = false;
  feedback.textContent = "Estrutura criada. Você pode editar o texto antes de copiar ou baixar.";
  output.focus();
});
document.getElementById("copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(output.value); feedback.textContent = "Roteiro copiado."; }
  catch { output.focus(); output.select(); feedback.textContent = "Selecione o texto e use Ctrl+C para copiar."; }
});
document.getElementById("download").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([output.value], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = "roteiro-kv-studio.txt"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000); feedback.textContent = "Download do roteiro iniciado.";
});
