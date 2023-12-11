hsh = {
  'red' => 12,
  'green' => 13,
  'blue' => 14
}

f = File.new('puzzle_2.txt').readlines
f = f.map do |line|
  line.split(': ')
end

f = f.map do |line| 
  line[1] = line[1].gsub("\n", '')
  line[1].split('; ')
end

total = 0
f.each do |line|
  colors_hash = {
    'red' => 1,
    'blue' => 1,
    'green' => 1
  }

  line.each do |showing|
    red = /[1-9]?[0-9] red/.match(showing)
    green = /[1-9]?[0-9] green/.match(showing)
    blue = /[1-9]?[0-9] blue/.match(showing)
    
    red = red[0].split(' ') if red
    green = green[0].split(' ') if green
    blue = blue[0].split(' ') if blue

    [red, green, blue].each do |color|
      next if color.nil?
      color_num = color[0].to_i
      color_name = color[1]
      colors_hash[color_name] = color_num if colors_hash[color_name] < color_num
    end
  end

  total += colors_hash.values.inject(1) { |prod, num| prod * num }
end

puts total