
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				playground: {
					DEFAULT: 'hsl(var(--playground-background))',
					foreground: 'hsl(var(--playground-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'neu': '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
				'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'spin': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { transform: 'scale(0.9)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					from: { backgroundPosition: '-200% 0' },
					to: { backgroundPosition: '200% 0' }
				},
				'reveal-right': {
					from: { transform: 'translateX(-20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'tooltip-appear': {
					from: { opacity: '0', transform: 'translateY(5px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'height-transition': {
					from: { height: '0' },
					to: { height: 'var(--element-height)' }
				},
				'height-expand': {
					from: { height: '0' },
					to: { height: 'var(--panel-height)' }
				},
				'horizontal-slide': {
					from: { transform: 'translateX(-20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse': 'pulse 2s infinite',
				'bounce': 'bounce 1s infinite',
				'spin': 'spin 1s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'reveal-right': 'reveal-right 0.5s ease-out forwards',
				'tooltip-appear': 'tooltip-appear 0.2s ease-out forwards',
				'height-transition': 'height-transition 0.3s ease-out',
				'height-expand': 'height-expand 0.3s ease-out',
				'horizontal-slide': 'horizontal-slide 0.5s ease-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'dot-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
				'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
			},
			minHeight: {
				'600': '600px',
			},
			height: {
				'panel': 'var(--panel-height)',
				'content': 'calc(100% - 50px)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addComponents, theme }) {
			addComponents({
				'[data-tooltip]': {
					'position': 'relative',
				},
				'[data-tooltip]:hover::before': {
					'content': 'attr(data-tooltip)',
					'position': 'absolute',
					'bottom': '100%',
					'left': '50%',
					'transform': 'translateX(-50%)',
					'marginBottom': '5px',
					'padding': '6px 10px',
					'borderRadius': theme('borderRadius.md'),
					'backgroundColor': 'hsl(var(--foreground))',
					'color': 'hsl(var(--background))',
					'fontSize': '0.75rem',
					'whiteSpace': 'nowrap',
					'zIndex': '50',
					'pointerEvents': 'none',
					'animation': theme('animation.tooltip-appear'),
				},
				'[data-tooltip]:hover::after': {
					'content': '""',
					'position': 'absolute',
					'bottom': '100%',
					'left': '50%',
					'transform': 'translateX(-50%)',
					'marginBottom': '0',
					'borderWidth': '5px',
					'borderStyle': 'solid',
					'borderColor': 'hsl(var(--foreground)) transparent transparent transparent',
					'zIndex': '50',
					'pointerEvents': 'none',
				},
				'.tooltip-top-left[data-tooltip]:hover::before': {
					'left': '0',
					'transform': 'translateX(0)',
				},
				'.tooltip-top-left[data-tooltip]:hover::after': {
					'left': '15px',
					'transform': 'translateX(0)',
				},
				'.interactive-hint': {
					'position': 'relative',
				},
				'.interactive-hint::after': {
					'content': '"Try me!"',
					'position': 'absolute',
					'top': '-25px',
					'left': '50%',
					'transform': 'translateX(-50%)',
					'backgroundColor': 'hsl(var(--primary))',
					'color': 'white',
					'padding': '2px 8px',
					'borderRadius': theme('borderRadius.md'),
					'fontSize': '0.7rem',
					'opacity': '0',
					'transition': 'opacity 0.3s',
				},
				'.interactive-hint:hover::after': {
					'opacity': '1',
				},
				'.h-min-content': {
					'height': 'min-content',
				},
				'.h-full-export': {
					'height': '100%',
					'min-height': '600px',
				},
				'.preview-container': {
					'height': '100%',
					'min-height': '600px',
					'display': 'flex',
					'flexDirection': 'column',
				},
				'.preview-content': {
					'flex': '1',
					'overflow': 'auto',
					'padding': '1rem',
				},
				'.tab-content-container': {
					'overflow-y': 'auto',
					'height': 'calc(100% - 50px)',
					'padding-bottom': '1rem',
				},
				'.horizontal-layout-panel': {
					'display': 'flex',
					'flex-direction': 'column',
					'height': '100%',
				}
			})
		}
	],
} satisfies Config;
