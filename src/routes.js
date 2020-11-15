import Foo from './routes/Foo.svelte'
import Bar from './routes/Bar.svelte'
import Home from './routes/Home.svelte'
import {wrap} from 'svelte-spa-router/wrap'
import {isAuthenticated} from './c8s/OidcContext.svelte'
import {get} from 'svelte/store'

const authConditions = [
    (detail => get(isAuthenticated))
]

export  default {
    '/': Home,
    '/foo': wrap({
        component: Foo,
        conditions: authConditions
    }),
    '/bar': wrap({
        component: Bar,
        conditions: authConditions
    })
}