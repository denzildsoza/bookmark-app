What Issues did I face while working on this project.

1. Google OAuth redirect errors
    I kept getting error while implementing google oauth2.o, has for security reasons, there should be a perfect match between url's, 
    and it was confusing to which url is to be placed where. I also faced some problems navigating through supabase UI interface.

    Through combined use of graphic inspection in google console, trial and error and light use of AI, I was able to figure it out.

2. Confusion between Supabase Auth or NextAuth
    both seemed to solve the same problem. But I went with supabase google auth has it handeled nearly all the aspects of authentication. Making the system light weight and less prone to error.
    Also It also facilitated a simpler architecture.

3. Bookmarks could be deleted without login
    enabled Row Level Security (RLS) 

4. Protecting Routes in Next.js
    Used protected route which wraps around a page, which redirects to login if the usser has missing session.

5. Understanding How User Session Works
    I had to go through a briefing regarding auth2.0 authentication architecture. I also learned that Supabase stores session in browser storage and automatically sends JWT tokens with requests.

6. Database Design Confusion
    Initially I had thought, that I have to manage user storage and authentication, but then I read the documentation about auth.users table feature that stores and manages users. 
    Hence I only had to create bookmarks table and manage and update that.

7. Realtime Updates
    I have worked on node based postgre servers and also implemented websockets. But I was unaware of how to in a serverless architecture, which I had to learn about supabase subscriptions that send alert to subscribed users when the db changes, which I use to update UI live.
 
8. I also faced erors relating to development in next which I solved through debugging, bruteforce and use of AI.


