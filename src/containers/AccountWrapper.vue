<template>
    <div class="wrap b-section b-section_page">
        <div class="b-section__content">
            <div class="b-controls">
                <span class="b-controls__title">
                    2 users selected
                </span>
                <div class="b-controls__btns">
                    <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                        <Edit />Edit
                    </el-button>
                    <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                        <Delete />Delete
                    </el-button>
                </div>
            </div>
            <div class="b-account">
                <div class="b-account__top b-account__row">
                    <div class="b-account__col">
                        <div class="b-account__inside b-account__inside_table">
                            <el-checkbox class="b-checkbox">User</el-checkbox>
                        </div>
                    </div>
                    <div class="b-account__col">
                        <div class="b-account__inside b-account__inside_table b-account__inside_right">
                            <span class="b-account__table-title">
                                Permission
                            </span>
                            <span class="b-account__arrow-icon">
                                <Arrow />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="b-account__list custom-scroll overflow-y">
                    <a href="javascript:void(0)" class="b-account__item b-account__item_selected">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox" checked></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-1.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Karen Marie Ørsted Andersen</span>
                                        <a href="mailto:karen.andersen@sunrise.com"
                                            class="b-account__email">karen.andersen@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-manager">Account manager</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item ">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-2.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Wendy Russell</span>
                                        <a href="mailto:wendy.russell@sunrise.com"
                                            class="b-account__email">wendy.russell@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-admin">Admin</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item b-account__item_selected">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox" checked></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-3.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Gladys Cooper</span>
                                        <a href="mailto:gladys.cooper@sunrise.com"
                                            class="b-account__email">gladys.cooper@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-admin">Admin</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item b-account__item_selected">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox" checked></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-4.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Gloria Fischer</span>
                                        <a href="mailto:gloria.fischer@sunrise.com"
                                            class="b-account__email">gloria.fischer@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-agent">Agent</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item ">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left">
                                <div class="b-account__inside" data-label="User">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-5.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Arthur Pena</span>
                                        <a href="mailto:arthur.pena@sunrise.com"
                                            class="b-account__email">arthur.pena@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-agent">Agent</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item ">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-6.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Clémentine Louis</span>
                                        <a href="mailto:clementine.louis@sunrise.com"
                                            class="b-account__email">clementine.louis@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-agent">Agent</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item ">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-7.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Francisco Lane</span>
                                        <a href="mailto:francisco.lane@sunrise.com"
                                            class="b-account__email">francisco.lane@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-agent">Agent</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-8.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Darrell Richards</span>
                                        <a href="mailto:darrell.richards@sunrise.com"
                                            class="b-account__email">darrell.richards@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-agent">Agent</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="b-account__item">
                        <div class="b-account__item-inside b-account__row">
                            <div class="b-account__col b-account__col_left" data-label="User">
                                <div class="b-account__inside">
                                    <el-checkbox class="b-checkbox"></el-checkbox>
                                    <div class="b-account__img-wrap">
                                        <img class="b-account__img" src="/src/assets/img/account-photo-9.webp" alt="#">
                                    </div>
                                    <div class="b-account__info">
                                        <span class="b-account__name">Max Hawkins</span>
                                        <a href="mailto:max.hawkins@sunrise.com"
                                            class="b-account__email">max.hawkins@sunrise.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="b-account__col" data-label="Permission">
                                <div class="b-account__inside b-account__inside_editable">
                                    <el-button class="b-btn b-btn_tag b-btn_tag-reviewer">External reviewer</el-button>
                                    <div class="b-controls__btns b-account__controls">
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Edit />Edit
                                        </el-button>
                                        <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                                            <Delete />
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ElButton, ElCheckbox } from 'element-plus';
import Edit from '@/components/icons/Edit.vue';
import Delete from '@/components/icons/Delete.vue';
import Arrow from '@/components/icons/Arrow.vue';
</script>
