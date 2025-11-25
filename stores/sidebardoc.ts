import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', () => {
  // 状态
  const tagMap = ref({});
  const currentApi = ref(null);
  const apiHistory = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Getter 等效函数
  const tags = () => Object.keys(tagMap.value);
  
  const getApisByTag = (tag) => {
    return tagMap.value[tag] || []
  }
  
  const currentApiDetail = () => {
    return currentApi.value
  }

  // 数据解析函数
  const parseApiDoc = (apiDoc) => {
    if (!apiDoc) return {}
    
    const tagMap = {}
    
    if (!apiDoc.paths) return tagMap
    
    Object.entries(apiDoc.paths).forEach(([path, pathItem]) => {
      if (!pathItem) return
      
      Object.entries(pathItem).forEach(([method, operation]) => {
        const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
        
        if (httpMethods.includes(method) && 
            operation?.tags && 
            Array.isArray(operation.tags) && 
            operation.summary) {
          
          // 获取请求参数
          const requestParameters = operation.parameters ? operation.parameters.map(param => ({
            name: param.name,
            in: param.in,
            required: param.required || false,
            description: param.description || '',
            type: param.schema?.type || 'string',
            schema: param.schema || {}
          })) : []

          // 获取请求体参数
          const requestBody = operation.requestBody ? {
            description: operation.requestBody.description || '',
            required: operation.requestBody.required || false,
            content: operation.requestBody.content ? Object.entries(operation.requestBody.content).map(([contentType, content]) => ({
              contentType,
              schema: content.schema || {},
              examples: content.examples || {}
            })) : []
          } : null

          // 获取响应参数 - 增强版
          const responses = operation.responses ? Object.entries(operation.responses).map(([statusCode, response]) => {
            const responseContent = response.content ? Object.entries(response.content).map(([contentType, content]) => ({
              contentType,
              schema: content.schema || {},
              examples: content.examples || {},
              encoding: content.encoding || {}
            })) : []
            
            const responseHeaders = response.headers ? Object.entries(response.headers).map(([headerName, header]) => ({
              name: headerName,
              description: header.description || '',
              schema: header.schema || {},
              required: header.required || false
            })) : []

            return {
              statusCode,
              description: response.description || '',
              content: responseContent,
              headers: responseHeaders,
              links: response.links || {}
            }
          }) : []

          operation.tags.forEach((tag) => {
            if (!tagMap[tag]) {
              tagMap[tag] = []
            }
            
            tagMap[tag].push({
              title: operation.summary,
              path: path,
              method: method.toUpperCase(),
              url: `#${CSS.escape(path)}`,
              parameters: requestParameters,
              requestBody: requestBody,
              responses: responses,
              description: operation.description || '',
              operationId: operation.operationId || '',
              deprecated: operation.deprecated || false
            })
          })
        }
      })
    })
    
    return tagMap
  }

  // 获取侧边栏数据结构
  const getSidebarData = () => {
    const result = []
    
    Object.entries(tagMap.value).forEach(([tag, children]) => {
      result.push({
        title: tag,
        children: children,
        url: `#${tag}`
      })
    })
    
    return result
  }

  // Actions
  const fetchApiData = async () => {
    loading.value = true
    error.value = null
    
    try {
      // 这里调用你的API获取数据
      // 假设你有一个 useApi() 的 composable
      const { get } = useApi()
      const apiDocList = await get('/doc')
      
      // 解析数据并存储
      const parsedData = parseApiDoc(apiDocList)
      tagMap.value = parsedData
      
      console.log('API数据获取并解析完成:', parsedData)
      return parsedData
      
    } catch (err) {
      error.value = err.message
      console.error('获取API数据失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setApiData = (data) => {
    tagMap.value = data
    console.log('API数据已存储到Pinia:', data)
  }

  const setCurrentApi = (apiData) => {
    //currentApi.value = apiData
// 确保传入的数据不为 null
    currentApi.value = apiData || {
        title: '',
        method: '',
        path: '',
        parameters: [],
        requestBody: null,
        responses: []
      }
    
    // 添加到历史记录
    if (apiData) {
      apiHistory.value.unshift({
        ...apiData,
        timestamp: new Date().toISOString()
      })
      
      // 保持最近10条记录
      if (apiHistory.value.length > 10) {
        apiHistory.value.pop()
      }
    }
    
    console.log('当前API已更新:', apiData)
  }

  const clearCurrentApi = () => {
    currentApi.value = null
  }

  const findApiByPathAndMethod = (path, method) => {
    const allApis = Object.values(tagMap.value).flat()
    return allApis.find(api => 
      api.path === path && api.method === method
    )
  }

  const searchApis = (keyword) => {
    if (!keyword) return []
    
    const allApis = Object.values(tagMap.value).flat()
    return allApis.filter(api => 
      api.title.toLowerCase().includes(keyword.toLowerCase()) ||
      api.path.toLowerCase().includes(keyword.toLowerCase()) ||
      api.description?.toLowerCase().includes(keyword.toLowerCase()) ||
      api.operationId?.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  return {
    // 状态
    tagMap,
    currentApi,
    apiHistory,
    loading,
    error,
    
    // Getter
    tags,
    getApisByTag,
    currentApiDetail,
    getSidebarData,
    
    // Actions
    fetchApiData,
    setApiData,
    setCurrentApi,
    clearCurrentApi,
    findApiByPathAndMethod,
    searchApis
  };
})