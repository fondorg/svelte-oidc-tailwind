<script>
    import Tailwindcss from './Tailwindcss.svelte'
    import CenteredFlex from './c8s/CenteredFlex.svelte'
    import OidcContext, {
        authError,
        idToken,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshToken,
        userInfo,
    } from './c8s/OidcContext.svelte';

    import Router from 'svelte-spa-router'
    import routes from './routes.js'
    import {replace} from 'svelte-spa-router'
</script>

<Tailwindcss/>
<CenteredFlex>
    <p>This is the <a class="text-blue-700" target="_blank" href="https://svelte.dev/tutorial">Svelte</a> template with:
    </p>
    <p><a target="_blank" class="text-blue-700" href="https://github.com/IdentityModel/oidc-client-js">oidc-client</a>
    </p>
    <p><a target="_blank" class="text-blue-700" href="https://tailwindcss.com/">Tailwindcss</a></p>
    <p><a target="_blank" class="text-blue-700" href="https://github.com/ItalyPaleAle/svelte-spa-router">svelte-spa-router</a>
    </p>

</CenteredFlex>
<div class="flex space-x-2 pt-4">
    <div>Login to navigate:</div>
    <div><a class="text-blue-700" href="#/foo">Foo</a></div>
    <div><a class="text-blue-700" href="#/bar">Bar</a></div>
</div>

<CenteredFlex>
    <Router {routes} on:conditionsFailed={() => replace("/")}/>
</CenteredFlex>

<div>OIDC check:</div>
<OidcContext
        issuer="OIDC_ISSUER"
        client_id="OIDC_CLIENT_ID"
        redirect_uri="OIDC_REDIRECT_URL"
        post_logout_redirect_uri="OIDC_LOGOUT_REDIRECT_URL"
>

    {#if !$isAuthenticated}
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click|preventDefault='{() => login() }'>Login</button>
    {/if}
    {#if $isAuthenticated}
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click|preventDefault='{() => logout() }'>Logout</button>
    {/if}
    <br/>
    <pre>isLoading: {$isLoading}</pre>
    <pre>isAuthenticated: {$isAuthenticated}</pre>
    <pre>authToken: {$accessToken}</pre>
    <pre>idToken: {$idToken}</pre>
    <pre>userInfo: {JSON.stringify($userInfo, null, 2)}</pre>
    <pre>authError: {$authError}</pre>
</OidcContext>

