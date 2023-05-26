const host = 'http://localhost:3001';

export const sendRequest = (options) => {
	uni.request({
		url: host + options.url,
		method:options.method || 'GET',
		header:options.header || {},
		data: options.data || {},
		success: (res) => {
			options.success(res)
		},
		fail: (err) => {
			uni.showToast({
				title: "请求接口失败",
				icon: 'error'
			})
			reject(err)
		}
	})
}