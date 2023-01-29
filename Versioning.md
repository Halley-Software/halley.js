# For now this file will be a note to remember how the versions should be published

 - # latest's versions:
    - ## This versions only will be released when the package works fine with the new feature added, bug fixed, ...etc
    - ### There are published under 'latest' tag into npm registry (default tag)

 - # next.* versions:
    - ## This versions are the pre latest's version, this versions is like a 'beta' that works fine but still must be refined a few before be a latest version
    - ### There are published under 'next' tag into npm registry
      ## Examples:
         x.x.x-next
         x.x.x-next.1
 
 - # next-development.* versions:
   - ## This versions is used to release new features or bug fixs when these changes are approximately to reach his original purpose
   - ### There are published under 'next' tag into npm registry
      ## Examples:
         x.x.x-next-development
         x.x.x-next-development.1

 - # development.* versions:
   - ## This versions is released when a new feauture or bug fix is detected and need to be tested before be a next version
   - ### There are published under 'development' tag into npm registry
      ## Examples:
         x.x.x-development
         x.x.x-development.1