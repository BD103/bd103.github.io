<template>
    <NuxtLayout>
        <template #sidebar>
            <h1>BD103</h1>

            <ul>
                <li>
                    <NuxtLink to="/">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog">
                        Blog
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="https://github.com/BD103" target="_blank">
                        Github
                    </NuxtLink>
                </li>
            </ul>

            <p>
                <NuxtLink to="https://github.com/BD103/bd103.github.io" target="_blank">
                    Source Code
                </NuxtLink>
            </p>
            <p>
                <NuxtLink to="/feed.xml" target="_blank">
                    RSS
                </NuxtLink>,
                <NuxtLink to="/atom.xml" target="_blank">
                    Atom
                </NuxtLink>
            </p>
        </template>

        <NuxtPage />
    </NuxtLayout>
</template>
