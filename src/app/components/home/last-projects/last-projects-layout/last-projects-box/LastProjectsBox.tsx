import Link from 'next/link'
import Tilt from 'react-parallax-tilt'
import { hoverRepoImage, resetRepoImage, repoBackgroundImageUrl } from '@/util/homeExternalJavascript'
import { useWindowSize } from 'react-use'

const LastProjectsBox = (props: any) => {
  const { width: windowWidth } = useWindowSize()

  const description = (projeto: any) => {
    const repoDesc = projeto.description.slice(0, projeto.description.indexOf('http'))
    if (windowWidth >= 1285) {
      return repoDesc.slice(0, 130)
    }
    if (windowWidth >= 1024) {
      return repoDesc.slice(0, 70)
    }
    return ''
  }

  return props.finalData
    ?.sort((previusRepo, repo) => {
      const actualDate = Date.parse(repo.pushed_at)
      const previusDate = Date.parse(previusRepo.pushed_at)

      return actualDate - previusDate
    })
    .map((projeto: any, repoIdx: number) => {
      if (projeto.stargazers_count !== '0') {
        return (
          <div className='LastProjectBox' key={`last-projects-${ projeto.name }`}>
            <Tilt
              glareEnable
              tiltMaxAngleX={5}
              tiltMaxAngleY={windowWidth >= 768 ? 5 : 25}
              perspective={1000}
              glareMaxOpacity={0.1}
              glareColor='#EBEAF0'
              glareReverse
              glareBorderRadius='1.5rem'
            >
              <div
                key={`last-projects-${ projeto }`}
                className='projectBoxClass relative rounded-3xl border border-gray-600 border-opacity-40 bg-[#462f3f4e] p-4 backdrop-blur-sm dark:bg-[#0819412c] lg:h-80  lg:p-4 '
              >
                <div className='flex items-center justify-center text-2xl font-black capitalize sm:mt-3 sm:text-center sm:text-xl md:mb-2 lg:h-1/6'>
                  {projeto.name.replace('-hm', '').replace('-', ' ')}
                </div>
                <div className='flex sm:flex-col md:flex-col lg:h-4/5 lg:flex-row'>
                  <div className='box-border sm:h-1/2 sm:w-full sm:px-10 sm:py-1 md:h-1/2 md:w-full md:py-2 lg:flex lg:h-full lg:w-1/2 lg:items-center lg:justify-center'>
                    <div className='rounded-3xl  bg-black sm:m-auto sm:hidden sm:aspect-video sm:w-full md:m-auto md:aspect-video md:h-full lg:aspect-square lg:h-[90%]'>
                      <Link
                        href={`${ projeto.homepage }`}
                        id={`link-last-repo-${ repoIdx }`}
                        onMouseOver={() => {
                          hoverRepoImage('last', repoIdx)
                        }}
                        onMouseOut={() => {
                          resetRepoImage('last', repoIdx)
                        }}
                        className='relative flex h-full w-full items-center justify-center overflow-y-hidden rounded-3xl'
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          id={`img-last-repo-${ repoIdx }`}
                          src={repoBackgroundImageUrl(projeto)}
                          alt='Project Background'
                          className='absolute top-0 flex items-center justify-center text-gray-600 ease-in-out'
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='sm:mt-3 sm:h-auto lg:w-1/2 lg:pl-2 '>
                    <div className=' lg:h-4/5'>
                      {windowWidth >= 600 ? (
                        <div className='md:mt-1 lg:h-2/5 '>
                          <div
                            tabIndex={0}
                            className='collapse-arrow collapse rounded-3xl border-gray-900 bg-gray-300 text-gray-900 dark:border dark:border-green-600 dark:bg-[#040C15] dark:text-white   sm:pl-5 '
                          >
                            <div className='text-medium collapse-title font-bold sm:px-0'>Recursos</div>
                            <div className='collapse-content'>
                              {projeto.topics.map((topic: Array<string>) => (
                                <div key={`badge-lastP-${ topic }`} className='badge ml-1 border-none  bg-gray-600 text-white'>
                                  #{topic}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className='mt-2 text-xs font-bold dark:font-thin lg:h-2/5'>{description(projeto)}</div>
                      <div className='flex sm:mt-5 md:mt-5 md:h-1/5 lg:h-auto'>
                        <Link
                          href={`${ projeto.html_url }`}
                          className='mr-2 h-full w-1/2 rounded-2xl border-2  border-indigo-600 bg-indigo-600  bg-opacity-20 text-center font-black text-indigo-600 duration-500  hover:bg-opacity-30 dark:border-blue-600 dark:bg-blue-600 dark:bg-opacity-5 dark:text-blue-600 dark:hover:bg-opacity-10 sm:w-full sm:py-3 md:py-3'
                        >
                          Code
                        </Link>

                        <Link
                          href={`${ projeto.homepage }`}
                          className='h-full w-1/2 rounded-2xl border-2 border-red-800 bg-red-800 bg-opacity-20 text-center font-black text-red-800  duration-500 hover:bg-opacity-30 dark:border-emerald-500 dark:bg-emerald-500 dark:bg-opacity-5 dark:text-emerald-500 dark:hover:bg-opacity-10 sm:w-full sm:py-3 md:py-3'
                        >
                          Demo
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        )
      }
      return null
    })
}

export default LastProjectsBox
