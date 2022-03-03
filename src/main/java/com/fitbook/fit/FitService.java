package com.fitbook.fit;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.product.ProductDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.program.ProgramEntity;
import com.fitbook.model.question.QuestionDto;
import com.fitbook.program.ProgramMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class FitService {

    @Autowired ProgramMapper programMapper;
    @Autowired FitMapper mapper;
    @Autowired AuthenticationFacade authenticationFacade;

    public List<ProgramEntity> selProgramList() { return programMapper.selProgramList(); }

    public ResultVo insQuestion(QuestionDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.insQuestion(dto));

        if(!dto.getPrograms().equals("")) {
            int[] iprogramArr = Arrays.stream(dto.getPrograms().split(",")).mapToInt(Integer::parseInt).toArray();
            mapper.insProgramMapping(iprogramArr, authenticationFacade.getLoginUserPk());
        }

        return result;
    }

    public ResultVo delQuestion() {
        QuestionDto dto = new QuestionDto();
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.delQuestion(dto));
        return result;
    }

    public QuestionDto selQuestion() {
        if(authenticationFacade.getLoginUser() == null) {
            return null;
        }
        return mapper.selQuestion(authenticationFacade.getLoginUserPk());
    }

    public int calFitness(QuestionDto question, ProductVo product) {
        int fitness = 0;

        int budgetDifference = (product.getPrice() - question.getBudget());
        int budgetScore = 0;
        if(budgetDifference <= 0) {
            budgetScore = 20;
        } else {
            budgetScore = 20 - (budgetDifference / 50000);
            budgetScore = Math.max(budgetScore, 0);
        }
        fitness += budgetScore;

        int weightScore = 0;
        switch (question.getWeight()) {
            case 0:
                weightScore = 15 - (int)((product.getWeight() - 1) * 10);
                break;
            case 1:
                weightScore = 15 - (int)((product.getWeight() - 1.5) * 10);
                break;
            case 2:
                weightScore = 15;
        }
        weightScore = Math.max(weightScore, 0);
        weightScore = Math.min(weightScore, 15);
        fitness += weightScore;

        int sizeScore = 0;
        switch (question.getSize()) {
            case 0:
                sizeScore = 10 - ((int)Math.floor(product.getSize()) - 13) * 3;
                break;
            case 1:
                int size = (int)Math.floor(product.getSize());
                if(size < 14) {
                    sizeScore = 10 + (size - 14) * 3;
                } else if(size > 15) {
                    sizeScore = 10 - (size - 15) * 3;
                } else {
                    sizeScore = 10;
                }
                break;
            case 2:
                sizeScore = 10;
        }
        sizeScore = Math.max(sizeScore, 0);
        sizeScore = Math.min(sizeScore, 10);
        fitness += sizeScore;

        int osScore = 0;
        switch (question.getOs()) {
            case 0:
                if(!product.getOs().equals("FreeDOS")) {
                    osScore = 5;
                }
                break;
            case 1:
                if(product.getOs().equals("FreeDOS")) {
                    osScore = 5;
                }
                break;
            case 2:
                osScore = 5;
        }
        fitness += osScore;

        int asScore = 0;
        if(question.getAs() == 1) {
            asScore = 5;
        } else {
            if(product.getBrand().equals("삼성") || product.getBrand().equals("LG")) {
                asScore = 5;
            }
            // TODO 다른 브랜드들
        }
        fitness += asScore;

        int batteryScore = 0;
        if(question.getBattery() == 1) {
            batteryScore = 5;
        } else {
            if(product.getBattery() >= 70) {
                batteryScore = 5;
            } else if(product.getBattery() >= 60) {
                batteryScore = 4;
            } else if(product.getBattery() >= 50) {
                batteryScore = 3;
            } else if(product.getBattery() >= 40) {
                batteryScore = 2;
            } else {
                batteryScore = 1;
            }
        }
        fitness += batteryScore;

        if(question.getTwoinone().equals("Y")) {
            if(product.getIstwoinone().equals("Y")) {
                fitness += 5;
            }
        } else {
            fitness += 5;
        }

        if(question.getMacbook().equals("Y")) {
            if(product.getBrand().equals("APPLE")) {
                fitness += 5;
            }
        } else {
            fitness += 5;
        }

        if(question.getHighhz().equals("Y")) {
            int hz = product.getHz();
            if(hz >= 144) {
                fitness += 5;
            } else if(hz >= 120) {
                fitness += 4;
            }
        } else {
            fitness += 5;
        }

        if(question.getHighresolution().equals("Y")) {
            if(!product.getResolution().equals("1366x758") && !product.getResolution().equals("1920x1080(FHD)")) {
                fitness += 5;
            }
        } else {
            fitness += 5;
        }

        int performanceScore = 0;
        if(question.getPrograms() == null || question.getPrograms().equals("")) {
            performanceScore = 20;
        } else {
            int cpuPerformanceDifference = product.getCpuPerformance() - question.getRequiredCpu();
            performanceScore += Math.max(cpuPerformanceDifference >= 0 ? 7 : 7 + cpuPerformanceDifference / 1000, 0);

            int gpuPerformanceDifference = product.getGpuPerformance() - question.getRequiredGpu();
            performanceScore += Math.max(gpuPerformanceDifference >= 0 ? 7 : 7 + gpuPerformanceDifference / 1000, 0);

            int ramDifference = product.getRam() - question.getRequiredRam();
            performanceScore += Math.max(ramDifference >= 0 ? 6 : 6 + ramDifference, 0);
        }
        fitness += performanceScore;

        return fitness;
    }

    public QuestionDto calRequiredPerformance(QuestionDto dto) {
        List<QuestionDto> list = mapper.selRequiredPerformance(selMyProgramList());
        for(QuestionDto program : list) {
            dto.setRequiredCpu(Math.max(dto.getRequiredCpu(), program.getRequiredCpu()));
            dto.setRequiredGpu(Math.max(dto.getRequiredRam(), program.getRequiredRam()));
            dto.setRequiredRam(Math.max(dto.getRequiredRam(), program.getRequiredRam()));
            if(dto.isSupportMac() && !program.isSupportMac()) {
                dto.setSupportMac(false);
            }
        }
        return dto;
    }

    public List<Integer> selMyProgramList() {
        return mapper.selMyProgramList(authenticationFacade.getLoginUserPk());
    }

    public List<ProductVo> selProductList() {
        return mapper.selProductList();
    }

    public ResultVo selFavorite(ProductDto dto) {
        return mapper.selFavorite(dto) == null ? new ResultVo() : mapper.selFavorite(dto);
    }

    public ResultVo selRating(ProductDto dto) {
        return mapper.selRating(dto) == null ? new ResultVo() : mapper.selRating(dto);
    }

    public ResultVo isFavorite(ProductDto dto) {
        dto.setIuser(authenticationFacade.getLoginUser() == null ? -1 :authenticationFacade.getLoginUserPk());
        return mapper.isFavorite(dto) == null ? new ResultVo() : mapper.isFavorite(dto);
    }

    public ResultVo isRating(ProductDto dto) {
        dto.setIuser(authenticationFacade.getLoginUser() == null ? -1 :authenticationFacade.getLoginUserPk());
        return mapper.isRating(dto) == null ? new ResultVo() : mapper.isRating(dto);
    }

    public ResultVo clickFavorite(ProductDto dto) {
        dto.setIuser(authenticationFacade.getLoginUser() == null ? -1 :authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        try {
            result.setResult(mapper.insFavorite(dto));
        } catch (Exception e) {
            result.setResult(mapper.delFavorite(dto));
        }
        return result;
    }
}
