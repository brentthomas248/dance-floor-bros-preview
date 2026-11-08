import{$ as e,A as t,At as n,B as r,Bt as i,Ct as a,D as o,F as s,Ft as c,G as l,H as u,I as d,It as f,J as ee,K as te,L as p,Lt as m,M as h,Mt as ne,N as re,Nt as ie,Ot as ae,Q as oe,R as se,Rt as ce,St as le,U as ue,V as g,W as _,X as de,Y as fe,Z as pe,_t as me,a as v,at as he,b as ge,bt as _e,c as y,ct as ve,dt as ye,et as be,f as xe,gt as Se,i as b,j as Ce,jt as we,lt as Te,m as Ee,mt as De,n as Oe,nt as ke,o as Ae,ot as je,pt as Me,q as Ne,r as Pe,s as Fe,st as Ie,t as Le,ut as Re,v as ze,vt as Be,w as Ve,wt as He,x as Ue,xt as x,y as We,z as S,zt as C}from"./assets/_shared-module_28-B61bYOsB.js";var w=`gitlab`,T=`GitLab`,E=`https://gitlab.com/api/v4`,Ge=`https://api.netlify.com`,Ke=`auth`,qe=`https://gitlab.com`,Je=`oauth/authorize`,Ye=e=>Be(e,w,{name:`name`,login:`username`,profileURL:`web_url`}),Xe=e=>`${e}/-/user_settings/personal_access_tokens?${new URLSearchParams({name:`Sveltia CMS`,scopes:`api,read_user`})}`,Ze=e=>Se({options:e,getUserProfile:Ye}),Qe=/(?<owner>.+)\/(?<repo>[^/]+)$/,D={...le},O=e=>e.match(Qe)?.groups??{},k=e=>{let{owner:t,repo:n}=e??D;return encodeURIComponent(`${t}/${n}`)},A=(e,t)=>`/projects/${k(t)}/repository/branches/${encodeURIComponent(e)}`,$e=He({tree:`/-/tree`,blob:`/-/blob`,commit:`/-/commit`}),et=`
  query($fullPath: ID!) {
    project(fullPath: $fullPath) {
      userPermissions {
        pushCode
      }
    }
  }
`,tt=async()=>{let e;try{e=await f(et)}catch(e){let t=e?.cause?.status;throw ie(D,t===404?void 0:t)}return{found:!!e.project,canPush:!!e.project?.userPermissions.pushCode}},nt=async()=>{let{found:e,canPush:t}=await tt();if(!t)throw ne(D.repo,e)},rt=async()=>{await ce(D.branch,async e=>({canPush:(await c(A(e))).can_push}))},it=`
  query($fullPath: ID!) {
    project(fullPath: $fullPath) {
      repository {
        rootRef
      }
    }
  }
`,at=async()=>{let e=await f(it),t=a(D,{found:!!e.project,branch:e.project?.repository?.rootRef,getBaseURLs:$e});return Object.assign(m,{branch:t}),t},ot=100,j={base:void 0,fork:void 0},st=()=>he(`gitlab`),M=()=>Te(D),ct=async()=>{let{owner:e,repo:t}=D,{found:n,canPush:r}=await tt();if(!n)throw we(`${e}/${t}`);return{canWrite:r}},lt=async()=>{let{owner:e,repo:t}=D,r;try{r=await c(`/projects/${k()}`)}catch{throw n(`Failed to read the repository.`,`open_authoring.permission_check_failed`,{repo:`${e}/${t}`})}let{id:i,forking_access_level:a}=r;return j.base=i,{allowForking:a!==`disabled`}},ut=async()=>{let{repo:e}=D,t=x.account?.login,n=await S(`/projects/${k({owner:t,repo:e})}`);if(n&&ae(n.forked_from_project?.path_with_namespace,D)&&n.namespace?.kind===`user`&&n.namespace?.full_path===t)return j.fork=n.id,O(n.path_with_namespace)},dt=async()=>{let e=x.account?.login,t=(await c(`/projects/${k()}/forks?owned=true&per_page=${ot}`)).find(({namespace:t})=>t?.kind===`user`&&t?.full_path===e);if(t)return j.fork=t.id,O(t.path_with_namespace)},ft=async()=>await ut()??dt(),pt=[`none`,`finished`],mt=async(e,t)=>{await je({repoPath:`${e.owner}/${e.repo}`,attemptsLeft:t,checkFork:async()=>{let t;try{({import_status:t}=await c(`/projects/${k(e)}`))}catch{return`pending`}return t===void 0||pt.includes(t)?`ready`:t===`failed`?`failed`:`pending`}})},ht=async()=>{let e=x.account?.login;try{return await c(`/projects/${k({owner:e,repo:D.repo})}`),!0}catch{return!1}},gt=async()=>{let{owner:e,repo:t}=D,n=`/projects/${k()}/fork`,r=`${e.replaceAll(`/`,`-`)}-${t}`,i=await ve({repoPath:`${e}/${t}`,requestFork:()=>c(n,{method:`POST`}),requestRenamedFork:()=>c(n,{method:`POST`,body:{name:r,path:r}}),conflictStatuses:[400,409],isNameTaken:ht}),a=O(i.path_with_namespace);return j.fork=i.id,await mt(a),a},_t=async()=>{let e=!1;await ye({repository:D,fetchAccess:ct,fetchFork:async()=>{let[t,n]=await Promise.all([lt(),ft()]);return{allowForking:e}=t,n},fetchForkingAllowed:()=>e,createFork:gt})},vt=async()=>{j.base=void 0,j.fork=void 0,await Re(_t)},yt=i[34][0],bt=`
  query($fullPath: ID!, $branch: String!) {
    project(fullPath: $fullPath) {
      repository {
        tree(ref: $branch) {
          lastCommit {
            sha
            message
          }
        }
      }
    }
  }
`,N=async()=>{let{repo:e,branch:t}=D,n=await f(bt);if(!n.project)throw de(`repository_not_found`,{repo:e});let{lastCommit:r}=n.project.repository.tree??{};if(!r)throw de(`branch_not_found`,{repo:e,branch:t});let{sha:i,message:a}=r;return{hash:i,message:a}},P=async(t,n)=>{e(n);let r=n.branch?b.current:void 0,i=n.branch??D.branch,a=(n.branch?n.headOid:te.current)||void 0,o=await Promise.all(t.map(async({action:e,path:t,previousPath:n,data:r=``})=>({action:e,content:typeof r==`string`?r:await Me(r),encoding:typeof r==`string`?`text`:`base64`,file_path:t,previous_path:n,...a&&e!==`create`?{last_commit_id:a}:{}}))),s=`/projects/${k(r)}/repository/commits`,l={branch:i,commit_message:oe(fe(t,n)),actions:o},{startBranch:u}=n,d=r?{start_project:j.base}:{},f;try{f=await c(s,{method:`POST`,body:u?{...l,start_branch:u,...d}:l,retryable:!0})}catch(e){throw a&&!n.branch&&e.cause?.status===400&&await ee(a,N),e}let{id:p,committed_date:m,parent_ids:h}=f,ne=await Promise.all(t.map(async({path:e,data:t})=>t===void 0?null:[e,{sha:await yt(t)}]));return{sha:p,date:new Date(m),parentSha:h?.[0],files:Object.fromEntries(ne.filter(e=>!!e))}},xt=new Map,St=async e=>{try{return await _e(xt,e,async()=>{let{avatar_url:t}=await c(`/avatar?email=${encodeURIComponent(e)}&size=48`);return t||void 0})}catch{return}},Ct=async e=>{let{branch:t}=D,n=k(),r=await pe(e,e=>c(`/projects/${n}/repository/commits?ref_name=${encodeURIComponent(t??``)}&path=${encodeURIComponent(e)}&per_page=${Ne}`),e=>({sha:e.id,message:e.title??``,authorName:e.author_name,authorEmail:e.author_email,authorAvatarURL:void 0,date:new Date(e.committed_date)})),i=[...new Set(r.map(e=>e.authorEmail))].filter(e=>!!e),a=new Map;return await l(i,async e=>{a.set(e,await St(e))}),r.forEach(e=>{e.authorAvatarURL=a.get(e.authorEmail)}),r},F=100,wt=6048e5,Tt={success:`ready`,pending:`pending`,running:`pending`,created:`pending`,preparing:`pending`,manual:`pending`,scheduled:`pending`,waiting_for_resource:`pending`,failed:`error`,canceled:`error`},Et={success:`ready`,created:`pending`,running:`pending`,blocked:`pending`,failed:`error`,canceled:`error`},Dt=async()=>c(`/projects/${k()}/pipeline`,{method:`POST`,body:{ref:D.branch},responseType:`raw`}),Ot=()=>u(D.branch,e=>A(e)),kt=async e=>{let t=new Date(Date.now()-wt).toISOString(),n=[...await c(`/projects/${k()}/deployments?order_by=updated_at&sort=desc&per_page=${F}&updated_after=${encodeURIComponent(t)}`)??[]].reverse();Object.entries(e).forEach(([e,t])=>{r(t,n.filter(t=>t.sha===e),({status:e})=>Et[e],({environment:e})=>({name:e?.name??``,url:e?.external_url,source:`deployment`}))})},At=async({sha:e},t)=>{let n=await c(`/projects/${k()}/repository/commits/${encodeURIComponent(e)}/statuses?per_page=${F}`);r(t[e],n,({status:e})=>Tt[e],({name:e,target_url:t,description:n})=>({name:e??``,url:t,description:n,source:`status`}))},jt=async(e,t)=>{await Promise.all([g(()=>kt(t)),l(e,e=>g(()=>At({sha:e,branch:``,kind:`preview`},t)))])},Mt=async e=>ue(e,{collect:jt,selfURL:D.repoURL}),Nt=i[18][0],Pt=i[20][0],Ft=({scoped:e})=>`
  query($fullPath: ID!, $branch: String!, $cursor: String!${e?`, $path: String!`:``}) {
    project(fullPath: $fullPath) {
      repository {
        tree(ref: $branch, ${e?`path: $path, `:``}recursive: true) {
          blobs(after: $cursor) {
            nodes {
              type
              path
              sha
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  }
`,It=`
  query($fullPath: ID!, $ref: String!, $path: String!, $cursor: String!) {
    project(fullPath: $fullPath) {
      repository {
        tree(ref: $ref, path: $path) {
          trees(after: $cursor) {
            nodes {
              name
              sha
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  }
`,Lt=async(e,t)=>{let{dirname:n=``,basename:r}=De(t),i=``;for(;;){let{nodes:t=[],pageInfo:a}=(await f(It,{ref:e,path:n,cursor:i})).project?.repository?.tree?.trees??{},o=t.find(({name:e})=>e===r)?.sha;if(o||!a?.hasNextPage)return o;i=a.endCursor}},Rt=`
  query($fullPath: ID!, $branch: String!, $paths: [String!]!) {
    project(fullPath: $fullPath) {
      repository {
        blobs(ref: $branch, paths: $paths) {
          nodes {
            path
            size
            rawTextBlob
          }
        }
      }
    }
  }
`,I=async(e,t,n={})=>{let r;try{r=await f(t,{...n,paths:e})}catch(r){if(e.length===1)throw r;let i=Math.ceil(e.length/2),a=await I(e.slice(0,i),t,n),o=await I(e.slice(i),t,n);return[...a,...o]}return r.project.repository.blobs.nodes},L=async(e,t,n={})=>{if(!e.length)return[];let{isSelfHosted:r=!1}=D,i=r?20:100,a=r?2:4;return(await _(re(e,i),e=>I(e,t,n),{concurrency:a})).flat()},R=async({ref:e,path:t})=>{let n=Ft({scoped:!!t}),r=[],i=``;for(;;){let{nodes:a,pageInfo:{endCursor:o,hasNextPage:s}}=(await f(n,{cursor:i,...e&&{branch:e},...t&&{path:t}})).project.repository.tree?.blobs??{nodes:[],pageInfo:{endCursor:``,hasNextPage:!1}};if(r.push(...a),i=o,!s)break}return r},z=`
  query($fullPath: ID!, $branch: String!, $paths: [String!]!) {
    project(fullPath: $fullPath) {
      repository {
        blobs(ref: $branch, paths: $paths) {
          nodes {
            path
            oid
          }
        }
      }
    }
  }
`,zt=async e=>{let t=s(),n=Nt();if(n){let{dirs:t,files:r}=n,[i,a]=await Promise.all([_(t,t=>R({ref:e,path:d(t)})),L(r.map(e=>d(e)),z,e?{branch:e}:{})]),o=[...i.flat(),...a.map(({path:e,oid:t})=>({type:`blob`,path:e,sha:t}))];if(o.length)return p(o)}return p(await R({ref:e,path:t}))},B=async(e,t,n={})=>{let r=await L(e,t,n);return Object.fromEntries(r.map(e=>[e.path,e]))},Bt=({fetchingFiles:e,blobs:t})=>Object.fromEntries(e.map(({path:e,sha:n,type:r})=>{let i=t[e]?.rawTextBlob??void 0;return[e,{sha:n,size:0,text:i,meta:i===void 0&&r!==`asset`?void 0:{}}]})),V=({projectId:e,path:t,ref:n,lfs:r=!1})=>`/projects/${e}/repository/files/${encodeURIComponent(t)}/raw?${r?`lfs=true&`:``}ref=${encodeURIComponent(n)}`,H=async(e,{ref:t,projectId:n=k()})=>{let r=new TextEncoder,i=Object.entries(e).filter(([,{size:e,rawTextBlob:t}])=>typeof t==`string`&&t.length<Number(e??0)&&r.encode(t).length<Number(e));await _(i,async([e,r])=>{r.rawTextBlob=await c(V({projectId:n,path:e,ref:t}),{responseType:`text`})})},Vt=async(e,t)=>{let n=Pt(e.length),r=e.filter(({type:e})=>e!==`asset`).map(({path:e})=>e),i;try{i=await B(r,Rt,t?{branch:t}:{}),await H(i,{ref:t??D.branch})}finally{n()}return Bt({fetchingFiles:e,blobs:i})},Ht=async({lastCommit:e}={})=>{await se({isOpenAuthoringConfigured:st,initOpenAuthoring:vt,repository:D,checkAccess:nt,checkBranchAccess:rt,fetchDefaultBranchName:at,fetchLastCommit:N,lastCommit:e,fetchFileList:zt,fetchFileContents:Vt})},Ut=async e=>{let{branch:t=``}=D,{path:n,workflow:r}=e,i=r?.branch??t,a=k(r?M():void 0);return c(V({projectId:a,path:n,ref:i,lfs:!0}),{responseType:`blob`})},Wt=i[23][0],Gt=`https://status.gitlab.com/`,Kt=Wt(`https://status-api.hostedstatus.com/1.0/status/5b36dc6502d06804c08349f7`,({result:{status_overall:{status_code:e}}})=>e===100?`none`:[200,300,400].includes(e)?`minor`:[500,600].includes(e)?`major`:void 0),U=e=>`/projects/${k()}/merge_requests/${e}`,W={mergeRequests:100,files:100,branches:100,authoredMergeRequests:100},G=o({regex:/^\s*(?:\[draft\]|\(draft\)|draft:)\s*/i,prefix:`Draft: `}),qt=e=>typeof e.user?.can_merge==`boolean`?e.user.can_merge:void 0,K=e=>t({login:e?.username,name:e?.name,id:e?.id}),q=(e,t)=>({number:e.iid,nodeId:String(e.id),title:G.strip(e.title),url:e.web_url,branch:e.source_branch,headSHA:e.sha,status:t,createdDate:new Date(e.created_at),updatedDate:new Date(e.updated_at),author:K(e.author),files:[],canMerge:qt(e),description:e.description??``}),Jt=e=>{if(e.source_project_id!==e.target_project_id||e.target_branch!==D.branch)return;let t=Fe(e.labels??[]);if(t)return q(e,t)},J=e=>({path:e.deleted_file?e.old_path:e.new_path,sha:``,size:0,deleted:!!e.deleted_file,previousPath:e.renamed_file?e.old_path:void 0}),Y=async e=>(await S(A(e,M())))?.commit?.id,Yt=async e=>{let{number:t,branch:n,headSHA:r}=e,i=`/projects/${k()}`,[a,o]=await Promise.all([Y(n),c(`${U(t)}/diffs?per_page=${W.files}`)]);if(!a||a===r){e.files=o.map(J);return}let{diffs:s=[]}=await c(`${i}/repository/compare?from=${encodeURIComponent(D.branch)}&to=${encodeURIComponent(a)}&straight=false`);Object.assign(e,{headSHA:a,files:s.map(J)})},Xt=`
  query($fullPath: ID!, $branch: String!, $paths: [String!]!) {
    project(fullPath: $fullPath) {
      repository {
        blobs(ref: $branch, paths: $paths) {
          nodes {
            path
            oid
            size
            rawTextBlob
          }
        }
      }
    }
  }
`,Zt=`
  query($fullPath: ID!, $iids: [String!]) {
    project(fullPath: $fullPath) {
      mergeRequests(iids: $iids, first: 100) {
        nodes {
          iid
          userPermissions {
            canMerge
          }
        }
      }
    }
  }
`,Qt=async e=>{let t=new Map(e.map(e=>[String(e.number),e])),n=re([...t.keys()],W.mergeRequests);await l(n,async e=>{try{(await f(Zt,{iids:e})).project?.mergeRequests?.nodes.forEach(({iid:e,userPermissions:n})=>{let r=t.get(String(e));r&&typeof n?.canMerge==`boolean`&&(r.canMerge=n.canMerge)})}catch{}})},$t=async e=>{let t=e.files.filter(({deleted:e})=>!e);if(!t.length)return;let n=M(),{owner:r,repo:i}=n,a=e.headSHA??e.branch,o=await B(t.map(({path:e})=>e),Xt,{fullPath:`${r}/${i}`,branch:a});await H(o,{ref:a,projectId:k(n)}),t.forEach(e=>{let t=Object.hasOwn(o,e.path)?o[e.path]:void 0;t?Object.assign(e,{sha:t.oid,size:Number(t.size)||0,text:t.rawTextBlob??void 0}):e.deleted=!0})},en=async()=>{let e=new Map;await l(Ae(),async t=>{(await c(`/projects/${k()}/merge_requests?state=opened&order_by=updated_at&per_page=${W.mergeRequests}&labels=${encodeURIComponent(t)}`)).forEach(t=>{let n=Jt(t);n&&e.set(t.iid,n)})});let t=[...e.values()].sort((e,t)=>t.updatedDate.getTime()-e.updatedDate.getTime());return await Promise.all([Qt(t),l(t,async e=>{await Yt(e),await $t(e)})]),t},X=async e=>{await Ue({branch:e,path:A(e,M()),goneStatuses:[404]})},Z=async({branch:e,title:t,status:n,description:r})=>{let i=n===`draft`,a=b.current;return{...q(await c(`/projects/${k(a)}/merge_requests`,{method:`POST`,body:{title:G.format(t,i),source_branch:e,target_branch:D.branch,description:r,remove_source_branch:!0,...a?{target_project_id:j.base,allow_collaboration:!0}:{labels:y(n)}}}),n),title:t,branch:e,description:r}},tn=async(e,t=e=>e.source_project_id===e.target_project_id)=>(await c(`/projects/${k()}/merge_requests?state=opened&source_branch=${encodeURIComponent(e)}&per_page=${W.mergeRequests}`)).filter(t),Q=async e=>await c(U(e.number)),nn=async(e,t)=>{let n=t((await Q(e)).description??``);return await c(U(e.number),{method:`PUT`,body:{description:n}}),n},rn=async()=>{let e=Pe(),t=await c(`/projects/${k(M())}/repository/branches?search=${encodeURIComponent(`^${e}`)}&per_page=${W.branches}`);return t.length===W.branches&&console.warn(`Only the first ${W.branches} Editorial Workflow branches in the fork are listed. Publish or discard some entries to see the rest.`),t},an=e=>e.source_project_id===j.fork&&e.target_branch===D.branch,$=e=>an(e)&&x.account?.id!==void 0&&e.author?.id===x.account.id,on=async e=>{let t=new Map;if(!e.length)return t;let n=new Set(e);return(await c(`/projects/${k()}/merge_requests?state=all&order_by=created_at&sort=desc&author_id=${x.account?.id}&per_page=${W.authoredMergeRequests}`)).forEach(e=>{$(e)&&n.has(e.source_branch)&&!t.has(e.source_branch)&&t.set(e.source_branch,e)}),t},sn=(e,t)=>{let{name:n,commit:r}=e,{id:i,message:a,committed_date:o,author_name:s,author_email:c}=r??{},l=t?.state===`merged`?void 0:t,u=l?.state===`opened`&&!l.draft,d=K(l?.author)??(s&&{name:s,email:c??``});return{number:l?.iid,nodeId:l?String(l.id):void 0,title:l?G.strip(l.title):a??``,url:l?.web_url,branch:n,headSHA:i,status:u?`pending_review`:`draft`,createdDate:new Date(l?.created_at??o),updatedDate:new Date(l?.updated_at??o),author:d||void 0,files:[],canMerge:!1}},cn=async e=>{let{branch:t=``}=D,{diffs:n=[]}=await c(`/projects/${k(M())}/repository/compare?from=${encodeURIComponent(t)}&to=${encodeURIComponent(e.branch)}&from_project_id=${j.base}`);e.files=n.map(J)},ln=async()=>{let e=await rn(),t=await on(e.map(({name:e})=>e)),n=await Ie(e,e=>{let n=t.get(e.name);return n?.state===`merged`&&n.sha===e.commit?.id?{leftover:e.name}:{pending:sn(e,n)}},X);await l(n,cn);let r=n.filter(({files:e})=>e.length);return await l(r,$t),r},un=({status:e,title:t,state:n,draft:r})=>e===`draft`?n===`opened`&&!r?{title:G.format(t,!0)}:{}:{...n===`closed`?{state_event:`reopen`}:{},...r?{title:t}:{}},dn=async(e,t)=>{Object.keys(t).length&&await c(U(e),{method:`PUT`,body:t})},fn=409,pn=async({branch:e,title:t,status:r,description:i})=>{try{return await Z({branch:e,title:t,status:r,description:i})}catch(i){if(i.cause?.status!==fn)throw i;let[a]=await tn(e,an);if(!a)throw i;if(!$(a))throw n(`The workflow branch is in use by another merge request.`,`workflow.branch_in_use`,{number:`!${a.iid}`});return await dn(a.iid,un({status:r,title:t,state:a.state,draft:a.draft})),{...q(a,r),title:t,branch:e}}},mn=async e=>{let t=await Q(e);return{merged:t.state===`merged`,isEntryRequest:$(t),getMergedSHA:async()=>t.sha,state:t.state,draft:t.draft}},hn=async({pullRequest:{number:e,title:t},status:n,state:r,draft:i})=>{await dn(e,un({status:n,title:t,state:r,draft:i}))},gn=async(e,t)=>ke({pullRequest:e,status:t,requestKey:`number`,createRequest:pn,fetchRequest:mn,applyStatus:hn,fetchBranchHead:Y,deleteBranch:X}),_n=[`preparing`,`unchecked`,`checking`,`approvals_syncing`],vn=Ce,yn=[..._n,`ci_still_running`,`mergeable`],bn=Ce,xn=async()=>v.current?ln():en(),Sn=async(e,t)=>{let{branch:n=``}=t,r=D.branch;return ge({branch:n,branchExistsStatus:400,commitFromStart:()=>P(e,{...t,startBranch:r}),commitOnBranch:()=>P(e,t),findOpenPullRequest:async()=>{let[e]=await tn(n);return e?`!${e.iid}`:void 0},inUseMessage:`The workflow branch is in use by another merge request.`,deleteBranch:X})},Cn=async(e,t,n)=>{let{branch:r=``}=t,i=await We({branch:r,headSHA:n.headSHA,fetchBranchHead:Y,getWorkflowRepository:M});try{return await P(e,{...t,headOid:i})}catch(e){throw e.cause?.status===400&&await ee(i,async()=>({hash:await Y(r)})),e}},wn=async(e,t)=>{if(v.current)return gn(e,t);let n=y(t),r=t===`draft`,i=G.format(e.title,r);return await c(U(e.number),{method:`PUT`,body:{title:i,add_labels:n,remove_labels:Ae().filter(e=>e!==n).join(`,`)}}),{...e,status:t,updatedDate:new Date}},Tn=async e=>{let{user_has_approved:t,user_can_approve:n}=await c(`${e}/approvals`);return{hasApproved:t,canApprove:n}},En=async e=>{let t=U(e.number),{hasApproved:n,canApprove:r}=await Tn(t);n||r===!1||await c(`${t}/approve`,{method:`POST`,body:{sha:e.headSHA}})},Dn=async e=>{let t=U(e.number);(await Tn(t)).hasApproved&&await c(`${t}/unapprove`,{method:`POST`})},On=async e=>Ee(e,{commitToNewBranch:Sn,commitToExistingBranch:Cn,createPullRequest:Z,updateDescription:nn}),kn=e=>h(async()=>{let{state:t,detailed_merge_status:n}=await Q(e);return{state:t,status:n}},({status:e})=>!_n.includes(e),vn),An=e=>ze({read:()=>Q(e),check:e=>{if(!e)return{};let{state:t,merge_when_pipeline_succeeds:n,detailed_merge_status:r}=e,i=t===`opened`&&!!n;return{merged:t===`merged`,failure:t===`locked`||i&&yn.includes(r)?void 0:`${t}, ${r}, auto-merge ${n?`on`:`off`}`,armed:i}},cancel:()=>c(`${U(e.number)}/cancel_merge_when_pipeline_succeeds`,{method:`POST`}),label:`merge request !${e.number}`}),jn=1e3,Mn=e=>e.new_file?`added`:e.deleted_file?`removed`:e.renamed_file?`renamed`:`modified`,Nn=e=>h(async()=>{let t=await Q(e),{sha:n,target_branch:r,source_project_id:i,target_project_id:a}=t;return!n||r!==D.branch||i!==a?{item:t,branchHead:void 0}:{item:t,branchHead:await Y(e.branch)??n}},({item:t,branchHead:n})=>n===void 0||n===t.sha||n!==e.headSHA,bn),Pn=async e=>{let{item:t,branchHead:n}=await Nn(e);if(!n)return{headSHA:t.sha,onConfiguredBranches:!1,files:[],complete:!1};let r=Ve(e,n);if(r)return r;let{diffs:i=[]}=await c(`/projects/${k()}/repository/compare?from=${encodeURIComponent(D.branch)}&to=${encodeURIComponent(n)}&straight=false`),a=t.sha===n?t.changes_count:void 0,o=a==null?void 0:`${a}`,s=o===void 0?i.length<jn:!o.endsWith(`+`)&&i.length>=Number(o);return{headSHA:n,onConfiguredBranches:!0,files:i.map(e=>({path:e.new_path,status:Mn(e),previousPath:e.renamed_file?e.old_path:void 0,mode:e.deleted_file?void 0:e.b_mode})),complete:s}},Fn=async({headSHA:e,paths:t})=>{let[n,r]=await Promise.all([D.branch,e].map(async e=>{let n=await L(t,z,{branch:e});return new Map(n.map(({path:e,oid:t})=>[e,t]))}));return t.filter(e=>n.get(e)===r.get(e))},In=async({pullRequest:e,path:t,body:n,refusal:r})=>{let{state:i,status:a}=await kn(e);if(i===`merged`)return!0;if(a===`mergeable`)return await c(t,{method:`PUT`,body:n}),!0;if(a!==`ci_still_running`)throw r;return await c(t,{method:`PUT`,body:{...n,auto_merge:!0,merge_when_pipeline_succeeds:!0}}),await An(e),!1},Ln={isGit:!0,name:w,label:T,repository:D,statusDashboardURL:Gt,checkStatus:Kt,init:()=>{let{backend:e}=Le.current??{};if(e?.name!==`gitlab`)return;let{repo:t,branch:n,auth_type:r=``,base_url:i=r===`pkce`?qe:Ge,auth_endpoint:a=r===`pkce`?Je:Ke,app_id:o=``,api_root:s=E,graphql_api_root:c=s.replace(/\/api\/.+$/,`/api/graphql`),include_credentials:l=!1}=e,{owner:u,repo:d}=O(t),f=`${u}/${d}`;return Oe(D,{service:w,label:T,owner:u,repo:d,branch:n,restApiRoot:s,defaultApiRoot:E,getTokenPageURL:Xe,getBaseURLs:$e,authRoot:i,authPath:a,tokenPath:`/token`,api:{clientId:o,authScope:`api`,authScheme:`Bearer`,restBaseURL:C(s),graphqlBaseURL:C(c),includeCredentials:l}}),Object.assign(m,{fullPath:f,branch:n}),D},signIn:Ze,signOut:me,fetchFiles:Ht,fetchLastCommit:N,fetchBlob:Ut,fetchDirSHA:Lt,commitChanges:P,fetchFileCommits:Ct,triggerDeployment:Dt,fetchBranchHeadSHA:Ot,fetchDeployments:Mt,workflow:{fetchPullRequests:xn,savePullRequest:On,updateStatus:wn,approve:En,withdrawApproval:Dn,fetchBranchHead:Y,fetchMergeState:Pn,fetchUnchangedPaths:Fn,publish:async e=>{be();let t=xe(),n=`${U(e.number)}/merge`,r={squash:t,should_remove_source_branch:!0,...e.headSHA?{sha:e.headSHA}:{},...t?{squash_commit_message:e.title}:{merge_commit_message:e.title}},i=!0;try{await c(n,{method:`PUT`,body:r})}catch(t){if(t.cause?.status!==405)throw t;i=await In({pullRequest:e,path:n,body:r,refusal:t})}i&&await X(e.branch)},discard:async e=>{e.number!==void 0&&await c(U(e.number),{method:`PUT`,body:{state_event:`close`}}),await X(e.branch)}}};export{Ln as gitlab};
//# sourceMappingURL=gitlab.js.map